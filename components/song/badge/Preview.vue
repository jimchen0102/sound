<script setup lang="ts">
import { DocumentData } from 'firebase/firestore'

defineProps<{
  song: DocumentData
}>()
</script>

<template>
  <div class="group flex items-center gap-x-4 rounded p-2 hover:bg-[#212121]">
    <div class="relative aspect-square w-16 cursor-pointer overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]">
      <img
        v-if="song.coverUrl"
        :src="song.coverUrl"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
      <div class="absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-white opacity-0 group-hover:opacity-100">
        <Icon
          name="Play"
          :size="20"
        />
      </div>
    </div>
    <div class="flex-1">
      <h3 class="line-clamp-1 font-bold text-white">
        <NuxtLink
          :to="`/song/${song.docID}`"
          class="hover:underline"
        >
          {{ song.title }}
        </NuxtLink>
      </h3>
      <h4 class="mt-1 line-clamp-1 text-sm text-white/50">
        {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt(song.createdAt) }}
      </h4>
    </div>
  </div>
</template>
