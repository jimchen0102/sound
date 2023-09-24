<script setup lang="ts">
import {
  collection,
  query,
  getDocs,
  DocumentData
} from 'firebase/firestore'

const db = useFirestore()
const songsCollection = collection(db, 'songs')

const songs = ref<DocumentData[]>([])

const getSongsDocument = async () => {
  const q = query(songsCollection)
  const snapshot = await getDocs(q)

  snapshot.forEach((doc) => {
    songs.value.push({
      ...doc.data(),
      docID: doc.id
    })
  })
}

onMounted(async () => {
  await getSongsDocument()
})
</script>

<template>
  <div
    v-if="songs"
    class="mt-5 lg:mt-7.5"
  >
    <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div
        v-for="song in songs"
        :key="song.docID"
      >
        <SongGalleryPreview :song="song" />
      </div>
    </div>
  </div>
</template>
