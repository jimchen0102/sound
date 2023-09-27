<script setup lang="ts">
import {
  collection,
  where,
  DocumentData
} from 'firebase/firestore'

const { $on, $off } = useNuxtApp()

const { isModalOpen } = useModal('modify')

const user = useCurrentUser()
const db = useFirestore()
const songCollection = collection(db, 'songs')

const {
  document: songs,
  getDocument: getSongsDocument,
  addDocument: addSongDocument,
  deleteDocument: deleteSongDocument
} = useLimitDocument(12, songCollection, where('uid', '==', user.value?.uid))

const modifySong = ref<DocumentData>()

const openModifyModal = (song: DocumentData) => {
  isModalOpen.value = true
  modifySong.value = song
}

onMounted(async () => {
  $on('add-song-document', addSongDocument)
  await getSongsDocument()
})

onUnmounted(() => {
  $off('add-song-document')
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
          @open-modal="openModifyModal"
          @delete-song="deleteSongDocument"
        />
      </li>
    </ul>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <SongModifyModal
        v-if="isModalOpen"
        :song="modifySong!"
      />
    </Transition>
  </Teleport>
</template>
