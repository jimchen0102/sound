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

const getSongDocument = async () => {
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
  await getSongDocument()
})
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    更多歌曲
  </h2>
  <div class="mt-5 lg:mt-7.5">
    <ul>
      <li
        v-for="song in songs"
        :key="song.docID"
        class="border-b border-white/10"
      >
        <SongBadgePreview :song="song" />
      </li>
    </ul>
  </div>
</template>
