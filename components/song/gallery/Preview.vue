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
      :to="`/song/${song.docID}`"
      class="block aspect-square overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]"
    >
      <img
        v-if="song.coverUrl"
        :src="song.coverUrl"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"
        :class="
          song.docID === currentSound?.docID ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
        "
      />
    </NuxtLink>
    <button
      type="button"
      class="absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#030303] text-white"
      :class="
        song.docID === currentSound?.docID ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
      "
      @click="createSound(song)"
    >
      <Icon
        v-if="song.docID === currentSound?.docID && isSoundPlaying"
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
  <h2 class="mt-4 line-clamp-2 font-bold leading-tight text-white">
    <NuxtLink
      to="/song/D3yU1dTaU4YQhtNiOpGn"
      class="hover:underline"
    >
      {{ song.title }}
    </NuxtLink>
  </h2>
  <h3 class="mt-1.5 text-sm text-white/50">
    {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt(song.createdAt) }}
  </h3>
</template>
