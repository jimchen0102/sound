<script setup lang="ts">
interface Props {
  size?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})
</script>

<template>
  <div class="h-6 w-6 animate-spin rounded-full border-2" />
</template>
