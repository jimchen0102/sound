<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { DocumentData } from 'firebase/firestore'
import { usePlayerStore } from '@/stores/player'

defineProps<{
  song: DocumentData
}>()

const playerStore = usePlayerStore()
const { currentSound, isSoundPlaying } = storeToRefs(playerStore)
const { createSound } = playerStore
</script>

<template>
  <div
    class="group flex items-center gap-x-4 rounded p-2 hover:bg-[#212121]"
    :class="{
      'bg-[#212121]': song.id === currentSound?.id
    }"
  >
    <div class="relative aspect-square w-16 overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]">
      <img
        v-if="song.cover"
        :src="song.cover"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
      <button
        type="button"
        class="absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-white"
        :class="
          song.id === currentSound?.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        "
        @click="createSound(song)"
      >
        <Icon
          v-if="song.id === currentSound?.id && isSoundPlaying"
          name="Pause"
          :size="20"
        />
        <Icon
          v-else
          name="Play"
          :size="20"
        />
      </button>
    </div>
    <div class="flex-1">
      <h3 class="line-clamp-1 font-bold text-white">
        <NuxtLink
          :to="`/song/${song.id}`"
          class="hover:underline"
        >
          {{ song.title }}
        </NuxtLink>
      </h3>
      <h4 class="mt-1 line-clamp-1 text-sm text-white/50">
        {{ song.displayName }} • {{ song.genre }} • {{ formatCreatedAt(song.createdAt) }}
      </h4>
    </div>
  </div>
</template>
