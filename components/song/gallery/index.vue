<script setup lang="ts">
import { QueryOptions } from '@/types'

const props = defineProps<QueryOptions>()

const {
  document: songs,
  isPending,
  observerEl
} = useQueryDocument('songs', {
  where: props.where,
  orderBy: props.orderBy,
  limit: props.limit
})
</script>

<template>
  <div
    v-if="songs"
    class="relative mt-5 lg:mt-7.5"
  >
    <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      <div
        v-for="song in songs"
        :key="song.id"
      >
        <SongGalleryPreview :song="song" />
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
</template>
