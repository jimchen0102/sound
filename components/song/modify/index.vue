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
const coll = collection(db, 'songs')

const {
  document: songs,
  isPending,
  observerEl,
  addDocument: addSongDocument,
  updateDocument: updateSongDocument,
  deleteDocument: deleteSongDocument
} = useLimitDocument(coll, 12, where('uid', '==', user.value?.uid))

const modifySong = ref<DocumentData>({})

const openModifyModal = (song: DocumentData) => {
  isModalOpen.value = true
  modifySong.value = song
}

onMounted(() => {
  $on('add-song-document', addSongDocument)
})

onUnmounted(() => {
  $off('add-song-document', addSongDocument)
})
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    我的歌曲
  </h2>
  <div class="relative mt-5 lg:mt-7.5">
    <ul>
      <li
        v-for="song in songs"
        :key="song.docID"
        class="border-b border-white/10"
      >
        <SongModifyPreview
          :song="song"
          @open-modify-modal="openModifyModal"
          @delete-song-document="deleteSongDocument"
        />
      </li>
    </ul>
    <div
      ref="observerEl"
      class="absolute -bottom-15 left-1/2 h-7.5 w-7.5 -translate-x-1/2 rounded-full bg-white"
      :class="
        isPending ? 'opacity-100 visible' : 'opacity-0 invisible'
      "
    />
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <SongModifyModal
        v-if="isModalOpen"
        :song="modifySong"
        @update-song-document="updateSongDocument"
      />
    </Transition>
  </Teleport>
</template>
