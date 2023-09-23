<script setup lang="ts">
import { type DocumentData } from 'firebase/firestore'

defineProps<{
  song: DocumentData
}>()
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
    </NuxtLink>
    <button
      type="button"
      class="invisible absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#030303] text-white opacity-0 group-hover:visible group-hover:opacity-100"
    >
      <Icon
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
    {{ song.displayName }} • {{ song.genre }} • {{ song.createdAt }}
  </h3>
</template>
