<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { doc, getDoc } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-vue'
import { usePlayerStore } from '@/stores/player'

const route = useRoute()

const db = useFirestore()

const playerStore = usePlayerStore()
const { currentSound, isSoundPlaying } = storeToRefs(playerStore)
const { createSound } = playerStore

const song = ref<DocumentData>()

const getSongDocument = async () => {
  const songRef = doc(db, 'songs', route.params.id as string)
  try {
    const snapshot = await getDoc(songRef)
    if (!snapshot.exists()) {
      await navigateTo('/')
      return
    }
    song.value = {
      ...snapshot.data()
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getSongDocument()
})
</script>

<template>
  <div
    v-if="!song"
    class="animate-pulse"
  >
    <div class="relative overflow-hidden rounded-lg bg-[#212121]">
      <div class="relative aspect-square overflow-hidden bg-[#383838] sm:mx-auto sm:max-w-[400px]" />
    </div>
    <div class="mt-7.5 flex gap-x-5">
      <div class="mt-1.5 flex-1 lg:mt-0">
        <div class="h-10 w-2/3 rounded bg-[#383838]" />
        <div class="mt-2 h-3 w-1/5 rounded bg-[#383838]" />
      </div>
      <div class="h-16 w-16 rounded-full bg-[#383838]" />
    </div>
    <p class="mt-5 h-15 w-1/2 rounded bg-[#383838]" />
    <ul class="mt-5 flex flex-wrap gap-2">
      <li
        v-for="num in 4"
        :key="num"
      >
        <div class="h-7.5 w-15 rounded-full bg-[#383838]" />
      </li>
    </ul>
  </div>
  <template v-else>
    <div
      class="relative overflow-hidden rounded-lg bg-[#212121] bg-cover bg-center"
      :style="{ backgroundImage: `url('${song?.cover}')` }"
    >
      <div class="absolute inset-0 backdrop-blur-2xl backdrop-brightness-50" />
      <div class="relative aspect-square overflow-hidden bg-gradient-to-b from-[#383838] to-[#767676] sm:mx-auto sm:max-w-[400px]">
        <img
          v-if="song?.cover"
          :src="song?.cover"
          :alt="song?.title"
          class="h-full w-full object-cover"
        >
      </div>
    </div>
    <div class="mt-7.5 flex gap-x-5">
      <div class="mt-1.5 flex-1 lg:mt-0">
        <h1 class="text-2xl font-bold text-white lg:text-3xl">
          {{ song.title }}
        </h1>
        <h2 class="mt-1 text-sm text-white/50">
          {{ song.displayName }} • {{ song.genre }} • {{ formatCreatedAt(song.createdAt) }}
        </h2>
      </div>
      <button
        type="button"
        class="flex h-16 w-16 items-center justify-center rounded-full bg-primary"
        @click="createSound(song)"
      >
        <IconPlayerPauseFilled v-if="song.id === currentSound?.id && isSoundPlaying" />
        <IconPlayerPlayFilled v-else />
      </button>
    </div>
    <p class="mt-5 whitespace-pre-wrap leading-[1.75] text-white/70">
      {{ song.description }}
    </p>
    <ul class="mt-5 flex flex-wrap gap-2">
      <li
        v-for="tag in song.tags"
        :key="tag"
      >
        <div class="flex h-7.5 items-center gap-x-1 rounded-full bg-[#212121] px-2.5 text-sm text-white">
          <span class="opacity-50">
            #
          </span>
          <span class="line-clamp-1 max-w-[120px]">
            {{ tag }}
          </span>
        </div>
      </li>
    </ul>
  </template>
</template>
