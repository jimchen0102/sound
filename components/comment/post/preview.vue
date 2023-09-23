<script setup lang="ts">
import { type DocumentData } from 'firebase/firestore'

defineProps<{
  comment: DocumentData
}>()
</script>

<template>
  <div class="relative">
    <div class="flex items-center gap-x-2">
      <h3 class="line-clamp-1 font-bold text-white lg:text-lg">
        {{ comment.name }}
      </h3>
      <span class="text-xs text-white/50">
        {{ comment.createdAt }}
      </span>
    </div>
    <p class="mt-1 whitespace-pre-wrap text-sm leading-[1.75] text-white/70">
      {{ comment.content }}
    </p>
  </div>
</template>
