import {
  query,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  getDocs,
  getCountFromServer,
  DocumentData,
  CollectionReference,
  QueryConstraint,
  QuerySnapshot
} from 'firebase/firestore'

export function useLimitDocument (
  collection: CollectionReference,
  limitLength: number,
  where?: QueryConstraint
) {
  const document = ref<DocumentData[]>([])
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
    const q = where
      ? query(collection, where)
      : collection
    const snapshot = await getCountFromServer(q)
    documentCount.value = snapshot.data().count
  }

  const getDocument = async () => {
    if (isPending.value || document.value.length >= documentCount.value) return

    isPending.value = true
    let snapshots: QuerySnapshot

    try {
      const lastDoc = document.value.length > 0
        ? await getDoc(doc(collection, document.value[document.value.length - 1].docID))
        : null

      const q = where
        ? query(
          collection,
          where,
          orderBy('createdAt', 'desc'),
          ...(lastDoc ? [startAfter(lastDoc)] : []),
          limit(limitLength)
        )
        : query(
          collection,
          orderBy('createdAt', 'desc'),
          ...(lastDoc ? [startAfter(lastDoc)] : []),
          limit(limitLength)
        )

      snapshots = await getDocs(q)
    } catch (error) {
      console.error(error)
      isPending.value = false
      return
    }

    setTimeout(async () => {
      snapshots.forEach((doc) => {
        document.value.push({
          ...doc.data(),
          docID: doc.id
        })
      })
      isPending.value = false
      await nextTick()
      if (observerEl.value) observer.observe(observerEl.value)
    }, 500)
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

  watch(documentCount, () => {
    getDocumentCount()
  })

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
