<script setup lang="ts">
import type { QueryOptions } from '@/types'

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
  <div class="relative mt-5 lg:mt-7.5">
    <ul>
      <li
        v-for="song in songs"
        :key="song.id"
        class="border-b border-white/10"
      >
        <SongBadgePreview :song="song" />
      </li>
    </ul>
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
