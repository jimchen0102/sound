<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { volume } = storeToRefs(playerStore)
const { updateVolume } = playerStore

const dragging = ref(false)
const sliderEl = ref<HTMLElement | null>(null)

const handleSliderDown = (e: MouseEvent | TouchEvent) => {
  e.preventDefault()

  handleDragStart(e)

  window.addEventListener('mousemove', handleDragging)
  window.addEventListener('touchmove', handleDragging)
  window.addEventListener('mouseup', handleDraggEnd)
  window.addEventListener('touchend', handleDraggEnd)
}

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  if (!sliderEl.value) return

  dragging.value = true

  const clientX = getClientX(e)
  const sliderSize = sliderEl.value.clientWidth
  const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
  const percent = (clientX - sliderOffsetLeft) / sliderSize

  updateVolume(percent)
}

const handleDragging = (e: MouseEvent | TouchEvent) => {
  if (!dragging.value || !sliderEl.value) return

  const clientX = getClientX(e)
  const sliderSize = sliderEl.value.clientWidth
  const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
  let percent = (clientX - sliderOffsetLeft) / sliderSize

  if (percent < 0) percent = 0
  else if (percent > 1) percent = 1

  updateVolume(percent)
}

const handleDraggEnd = () => {
  if (!dragging.value) return

  dragging.value = false

  window.removeEventListener('mousemove', handleDragging)
  window.removeEventListener('touchmove', handleDragging)
}
</script>

<template>
  <div
    ref="sliderEl"
    class="relative h-15 w-30 cursor-pointer overflow-hidden max-lg:hidden"
    @mousedown.left="handleSliderDown"
    @touchstart="handleSliderDown"
  >
    <div
      class="absolute left-0 top-0 h-full w-5 origin-left bg-[#383838]"
      :style="{ width: `${volume * 100}%` }"
    />
    <div class="absolute left-5 top-1/2 -translate-y-1/2 text-white">
      <Icon name="Volume" />
    </div>
  </div>
</template>
