<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { isSoundPlaying } = storeToRefs(playerStore)
const { toggleSound } = playerStore
</script>

<template>
  <button
    type="button"
    class="flex h-15 w-20 items-center justify-center overflow-hidden bg-primary lg:w-30"
    @click="toggleSound"
  >
    <div class="translate-x-1 translate-y-[3px]">
      <IconPlayerPauseFilled v-if="isSoundPlaying" />
      <IconPlayerPlayFilled v-else />
    </div>
  </button>
</template>
