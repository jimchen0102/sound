<script setup lang="ts">
import { DocumentData } from 'firebase/firestore'

defineProps<{
  song: DocumentData
}>()

const { isModalOpen } = useModal('modify')
</script>

<template>
  <div class="flex items-center gap-x-5 rounded p-2 hover:bg-[#212121]">
    <div class="flex flex-1 items-center gap-x-4">
      <div class="relative aspect-square w-16 overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]">
        <img
          v-if="song.coverUrl"
          :src="song.coverUrl"
          :alt="song.title"
          class="h-full w-full object-cover"
        >
      </div>
      <div class="flex-1">
        <h3 class="line-clamp-1 font-bold text-white">
          <NuxtLink :to="`/song/${song.docID}`">
            {{ song.title }}
          </NuxtLink>
        </h3>
        <h4 class="mt-1 line-clamp-1 text-sm text-white/50">
          {{ formattedCreatedAt(song.createdAt) }}
        </h4>
      </div>
    </div>
    <div class="flex">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
        @click="isModalOpen = true"
      >
        <Icon
          name="Edit"
          :size="20"
        />
      </button>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
      >
        <Icon
          name="Delete"
          :size="20"
        />
      </button>
    </div>
  </div>
</template>
