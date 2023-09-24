<script setup lang="ts">
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  DocumentData
} from 'firebase/firestore'

const { isModalOpen } = useModal('modify')

const user = useCurrentUser()
const db = useFirestore()
const songsCollection = collection(db, 'songs')

const songs = ref<DocumentData[]>()

const getSongsDocument = async () => {
  const q = query(
    songsCollection,
    where('uid', '==', user.value?.uid),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)

  snapshot.forEach((doc) => {
    songs.value?.push({
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
        <SongModifyPreview :song="song" />
      </li>
    </ul>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <SongModifyModal v-if="isModalOpen" />
    </Transition>
  </Teleport>
</template>
