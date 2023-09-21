<script setup lang="ts">
interface Props {
  name: string
  size?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
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
