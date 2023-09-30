<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { currentSound, isSoundLoaded } = storeToRefs(playerStore)
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-[997] flex overflow-hidden rounded-t-[40px] bg-[#212121] transition-transform duration-500 lg:inset-x-10 lg:rounded-t-[60px] xl:inset-x-20"
    :class="[
      currentSound ? 'translate-y-0' : 'translate-y-full',
      !isSoundLoaded && 'pointer-events-none'
    ]"
  >
    <SongPlayerButton />
    <SongPlayerTimeline />
    <SongPlayerVolume />
  </div>
</template>
