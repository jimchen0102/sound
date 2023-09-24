<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const {
  currentSound,
  seek,
  duration,
  progress
} = storeToRefs(playerStore)
const { updateSeek } = playerStore

const dragging = ref(false)
const sliderEl = ref<HTMLElement | null>(null)
const cacheProgress = ref(0)

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
  cacheProgress.value = (clientX - sliderOffsetLeft) / sliderSize
}

const handleDragging = (e: MouseEvent | TouchEvent) => {
  if (!dragging.value || !sliderEl.value) return

  const clientX = getClientX(e)
  const sliderSize = sliderEl.value.clientWidth
  const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
  cacheProgress.value = (clientX - sliderOffsetLeft) / sliderSize

  if (cacheProgress.value < 0) cacheProgress.value = 0
  else if (cacheProgress.value > 1) cacheProgress.value = 1
}

const handleDraggEnd = () => {
  if (!dragging.value) return

  dragging.value = false

  window.removeEventListener('mousemove', handleDragging)
  window.removeEventListener('touchmove', handleDragging)

  updateSeek(cacheProgress.value)
}
</script>

<template>
  <div
    ref="sliderEl"
    class="relative h-15 flex-1 cursor-pointer"
    @mousedown="handleSliderDown"
    @touchstart="handleSliderDown"
  >
    <div
      class="absolute left-0 top-0 h-full bg-[#383838] bg-[url('/assets/img/progress-arrow.svg')]"
      :style="{
        width: `${progress * 100}%`
      }"
    />
    <div
      v-if="dragging"
      class="absolute left-0 top-0 h-full bg-white/[.15]"
      :style="{
        width: `${cacheProgress * 100}%`
      }"
    />
    <div class="pointer-events-none relative flex h-full items-center justify-between gap-x-7.5 px-7.5 font-bold text-white">
      <span
        v-if="currentSound"
        class="max-lg:hidden"
      >
        {{ formatTime(seek) }}
      </span>
      <h2 class="line-clamp-1 flex-1 text-center">
        {{ currentSound?.title ? currentSound.title : '尚無播放的歌曲' }}
      </h2>
      <span
        v-if="currentSound"
        class="max-lg:hidden"
      >
        {{ formatTime(duration) }}
      </span>
    </div>
  </div>
</template>
