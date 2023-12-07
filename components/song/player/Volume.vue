<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { IconVolume, IconVolumeOff } from '@tabler/icons-vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { volume } = storeToRefs(playerStore)
const { updateVolume } = playerStore

const {
  sliderEl,
  handleSliderDown
} = useSlider({
  onDragStart: updateVolume,
  onDragging: updateVolume
})
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
      <IconVolumeOff v-if="volume === 0" />
      <IconVolume v-else />
    </div>
  </div>
</template>
