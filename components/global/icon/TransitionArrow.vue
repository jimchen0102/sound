<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
  color: string
}>(), {
  size: 20,
  color: 'currentColor'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    :width="size"
    :height="size"
    :fill="color"
    preserveAspectRatio="none"
  >
    <polygon points="0,0 3.33,10 0,20 16.67,20 20,10 16.67,0 " />
  </svg>
</template>
