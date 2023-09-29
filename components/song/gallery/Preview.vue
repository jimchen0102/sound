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
  <div class="group relative">
    <NuxtLink
      :to="`/song/${song.id}`"
      class="block aspect-square overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]"
    >
      <img
        v-if="song.cover"
        :src="song.cover"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"
        :class="
          song.id === currentSound?.id ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
        "
      />
    </NuxtLink>
    <button
      type="button"
      class="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
      :class="
        song.id === currentSound?.id ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
      "
      @click="createSound(song)"
    >
      <Icon
        v-if="song.id === currentSound?.id && isSoundPlaying"
        name="Pause"
        :size="18"
      />
      <Icon
        v-else
        name="Play"
        :size="18"
      />
    </button>
  </div>
  <h2 class="mt-4 line-clamp-2 font-bold leading-tight text-white">
    <NuxtLink
      :to="`/song/${song.id}`"
      class="hover:underline"
    >
      {{ song.title }}
    </NuxtLink>
  </h2>
  <h3 class="mt-1.5 text-sm text-white/50">
    {{ song.displayName }} • {{ song.genre }} • {{ formatCreatedAt(song.createdAt) }}
  </h3>
</template>
