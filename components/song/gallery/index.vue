<script setup lang="ts">
import {
  collection,
  query,
  getDocs,
  type DocumentData
} from 'firebase/firestore'

const songs = ref<DocumentData[]>([])

const getSongsData = async () => {
  const db = useFirestore()
  const songsCollection = collection(db, 'songs')
  const q = query(songsCollection)
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    songs.value.push({
      ...doc.data(),
      docID: doc.id
    })
  })
}

await getSongsData()
</script>

<template>
  <div class="mt-5 lg:mt-7.5">
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
