<script setup lang="ts">
import { collection } from 'firebase/firestore'

const db = useFirestore()
const coll = collection(db, 'songs')

const {
  document: songs,
  isPending,
  observerEl
} = useLimitDocument(coll, 12)
</script>

<template>
  <div
    v-if="songs"
    class="relative mt-5 lg:mt-7.5"
  >
    <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div
        v-for="song in songs"
        :key="song.docID"
      >
        <SongGalleryPreview :song="song" />
      </div>
    </div>
    <div
      ref="observerEl"
      class="absolute -bottom-15 left-1/2 h-7.5 w-7.5 -translate-x-1/2 rounded-full bg-white"
      :class="
        isPending ? 'opacity-100 visible' : 'opacity-0 invisible'
      "
    />
  </div>
</template>
