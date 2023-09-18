<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 24
  },
  height: {
    type: [String, Number],
    default: 24
  },
  color: {
    type: String,
    default: 'white'
  }
})
</script>

<template>
  <div class="h-6 w-6 animate-spin rounded-full border-2" />
</template>
