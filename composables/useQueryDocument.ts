import {
  query,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getCountFromServer,
  DocumentData,
  DocumentSnapshot,
  CollectionReference,
  FieldPath,
  WhereFilterOp
} from 'firebase/firestore'

export const useQueryDocument = (
  collection: CollectionReference,
  options: {
    where?: [fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown]
    limit?: number,
  }
) => {
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
    let q = query(collection)
    if (options.where) q = query(q, where(...options.where))
    const snapshot = await getCountFromServer(q)
    documentCount.value = snapshot.data().count
  }

  const getDocument = async () => {
    if (isPending.value || document.value.length === documentCount.value) return
    isPending.value = true
    let q = query(collection, orderBy('createdAt', 'desc'))
    if (options.where) q = query(q, where(...options.where))
    if (options.limit) q = query(q, limit(options.limit))
    if (lastDocument.value) q = query(q, startAfter(lastDocument.value))
    const snapshots = await getDocs(q)
    lastDocument.value = snapshots.docs[snapshots.docs.length - 1]
    snapshots.forEach((doc) => {
      document.value.push({
        ...doc.data(),
        docID: doc.id
      })
    })
    isPending.value = false
    if (observerEl.value) observer.observe(observerEl.value)
  }

  const addDocument = (doc: DocumentData) => {
    document.value.unshift({
      ...doc.data(),
      docID: doc.id
    })
  }

  const updateDocument = (updateDoc: DocumentData) => {
    const index = document.value.findIndex(doc => doc.docID === updateDoc.docID)
    document.value[index] = updateDoc
  }

  const deleteDocument = (docID: string) => {
    const index = document.value.findIndex(doc => doc.docID === docID)
    document.value.splice(index, 1)
  }

  watch(
    () => document.value.length,
    () => {
      getDocumentCount()
    }
  )

  onMounted(async () => {
    await getDocumentCount()
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
