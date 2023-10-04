<script setup lang="ts">
import type { DocumentData } from 'firebase/firestore'
import type { QueryOptions } from '@/types'

const props = defineProps<QueryOptions>()

const { isModalOpen } = useModal('modify')

const {
  document: songs,
  isPending,
  observerEl,
  updateDocument: handleUpdateSong,
  deleteDocument: handleDeleteSong
} = useQueryDocument('songs', {
  where: props.where,
  orderBy: props.orderBy,
  limit: props.limit
})

const modifySong = ref<DocumentData>({})

const handleOpenModal = (song: DocumentData) => {
  isModalOpen.value = true
  modifySong.value = song
}
</script>

<template>
  <div class="relative mt-5 lg:mt-7.5">
    <div class="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-6 xl:grid-cols-6">
      <div
        v-for="song in songs"
        :key="song.id"
      >
        <SongModifyPreview
          :song="song"
          @open-modal="handleOpenModal"
          @delete-song="handleDeleteSong"
        />
      </div>
    </div>
    <div
      ref="observerEl"
      class="absolute -bottom-15 left-1/2 -translate-x-1/2 text-white"
      :class="
        isPending ? 'visible opacity-100' : 'insivible opacity-0'
      "
    >
      <BaseLoading />
    </div>
  </div>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-[opacity] duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-1"
      leave-active-class="transition-[opacity] duration-300"
      leave-to-class="opacity-0"
      leave-from-class="opacity-1"
    >
      <SongModifyModal
        v-if="isModalOpen"
        :song="modifySong"
        @update-song="handleUpdateSong"
      />
    </Transition>
  </Teleport>
</template>
