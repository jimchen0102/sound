<script setup lang="ts">
import * as icons from '@tabler/icons-vue'

withDefaults(defineProps<{
  name: keyof typeof icons
  size?: number
  color?: string
  strokeWidth?: number
}>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2
})
</script>

<template>
  <component
    :is="icons[name]"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
  />
</template>
