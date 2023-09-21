<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  size?: number
  color?: string
}>(), {
  size: 24,
  color: 'currentColor'
})

const icon = computed(() => resolveComponent(`Icon${props.name}`))
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
  />
</template>
