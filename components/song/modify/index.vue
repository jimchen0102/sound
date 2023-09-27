<script setup lang="ts">
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  DocumentData
} from 'firebase/firestore'

const { $on, $off } = useNuxtApp()

const { isModalOpen } = useModal('modify')

const user = useCurrentUser()
const db = useFirestore()
const songsCollection = collection(db, 'songs')

const songs = ref<DocumentData[]>([])

const getSongsDocument = async () => {
  const q = query(
    songsCollection,
    where('uid', '==', user.value?.uid),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)

  snapshot.forEach((doc) => {
    songs.value.push({
      ...doc.data(),
      docID: doc.id
    })
  })
}

const addSong = (song: DocumentData) => {
  songs.value.unshift({
    ...song.data(),
    docID: song.id
  })
}

const deleteSong = (docID: string) => {
  const index = songs.value.findIndex(doc => doc.docID === docID)
  songs.value.splice(index, 1)
}

onMounted(async () => {
  $on('add-song', addSong)
  await getSongsDocument()
})

onUnmounted(() => {
  $off('add-song')
})
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    我的歌曲
  </h2>
  <div class="mt-5 lg:mt-7.5">
    <ul>
      <li
        v-for="song in songs"
        :key="song.docID"
        class="border-b border-white/10"
      >
        <SongModifyPreview
          :song="song"
          @delete-song="deleteSong"
        />
      </li>
    </ul>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <SongModifyModal v-if="isModalOpen" />
    </Transition>
  </Teleport>
</template>
