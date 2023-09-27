<script setup lang="ts">
import { collection } from 'firebase/firestore'

const db = useFirestore()
const songCollection = collection(db, 'songs')

const {
  document: songs,
  isPending,
  observerEl
} = useLimitDocument(12, songCollection)
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    更多歌曲
  </h2>
  <div class="relative mt-5 lg:mt-7.5">
    <ul>
      <li
        v-for="song in songs"
        :key="song.docID"
        class="border-b border-white/10"
      >
        <SongBadgePreview :song="song" />
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
</template>
