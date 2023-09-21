<script setup lang="ts">
defineProps<{
  size: number
  color: string
}>()
</script>

<template>
  <div class="h-6 w-6 animate-spin rounded-full border-2" />
</template>
