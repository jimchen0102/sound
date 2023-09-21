<script setup lang="ts">
interface Props {
  size: number
  color: string
}

defineProps<Props>()
</script>

<template>
  <div class="h-6 w-6 animate-spin rounded-full border-2" />
</template>
