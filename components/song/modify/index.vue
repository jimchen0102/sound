<script setup lang="ts">
import { collection, DocumentData } from 'firebase/firestore'

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
} = useQueryDocument(coll, {
  where: ['uid', '==', user.value?.uid],
  limit: 12
})

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
      class="absolute -bottom-15 left-1/2 -translate-x-1/2 text-white"
      :class="
        isPending ? 'visible opacity-100' : 'insivible opacity-0'
      "
    >
      <div class="relative h-7 w-7">
        <div class="h-full w-full animate-[rotate_1.568s_linear_infinite]">
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-1-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-2-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-3-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-4-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
