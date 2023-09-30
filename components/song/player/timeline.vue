<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const {
  currentSound,
  seek,
  duration,
  progress,
  isSoundLoaded
} = storeToRefs(playerStore)
const { updateSeek } = playerStore

const {
  isDragging,
  percent,
  sliderEl,
  handleSliderDown
} = useSlider({
  onDragEnd: updateSeek
})

const timeline = computed(() => {
  return isDragging.value && isSoundLoaded
    ? percent.value * 100
    : progress.value * 100
})
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
        width: `${timeline}%`
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
        {{ currentSound ? currentSound.title : '尚無播放的歌曲' }}
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
