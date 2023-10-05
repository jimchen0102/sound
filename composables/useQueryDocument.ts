import { query, where, orderBy, startAfter, limit, collection, getDocs, getCountFromServer } from 'firebase/firestore'
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import type { QueryOptions } from '@/types'

export const useQueryDocument = (name: string, options: QueryOptions) => {
  const db = useFirestore()
  const collectionRef = collection(db, name)

  const document = ref<DocumentData[]>([])
  const lastDocument = ref<DocumentSnapshot | null>(null)
  const documentCount = ref(0)
  const isPending = ref(false)
  const observerEl = ref<HTMLElement | null>(null)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(observerEl.value!)
        getDocument()
      }
    })
  })

  const getDocumentCount = async () => {
    const q = options.where
      ? query(collectionRef, where(...options.where))
      : query(collectionRef)
    const snapshot = await getCountFromServer(q)
    documentCount.value = snapshot.data().count
  }

  const getDocument = async () => {
    if (isPending.value) return
    isPending.value = true
    let q = query(collectionRef)
    if (options.where) q = query(q, where(...options.where))
    if (options.orderBy) q = query(q, orderBy(...options.orderBy))
    if (options.limit) q = query(q, limit(options.limit))
    if (lastDocument.value) q = query(q, startAfter(lastDocument.value))
    const snapshots = await getDocs(q)
    lastDocument.value = snapshots.docs[snapshots.docs.length - 1]
    snapshots.forEach((doc) => {
      document.value.push({
        ...doc.data()
      })
    })
    isPending.value = false
    await getDocumentCount()
    await nextTick()
    if (document.value.length === documentCount.value) return
    if (observerEl.value) observer.observe(observerEl.value)
  }

  const addDocument = (doc: DocumentData) => {
    document.value.unshift({
      ...doc.data()
    })
  }

  const updateDocument = ({ id, value }:{ id:string, value:DocumentData }) => {
    const index = document.value.findIndex(doc => doc.id === id)
    document.value[index] = {
      ...document.value[index],
      ...value
    }
  }

  const deleteDocument = (id: string) => {
    const index = document.value.findIndex(doc => doc.id === id)
    document.value.splice(index, 1)
  }

  watch(
    () => document.value.length,
    () => {
      getDocumentCount()
    }
  )

  onMounted(async () => {
    await getDocument()
  })

  return {
    document,
    documentCount,
    isPending,
    observerEl,
    getDocumentCount,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument
  }
}
