<script setup>
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { isSoundPlaying } = storeToRefs(playerStore)

const animation = ref(null)

watch(isSoundPlaying, (newVal) => {
  if (newVal) {
    animation.value.play()
    gsap.to(animation.value, {
      timeScale: 1,
      duration: 2
    })
  } else {
    gsap.to(animation.value, {
      timeScale: 0,
      duration: 2
    })
  }
})

onMounted(() => {
  animation.value = gsap
    .to('#character', {
      rotation: 360,
      duration: 0.75,
      ease: 'none',
      repeat: -1
    })
    .timeScale(0)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 overflow-hidden">
    <div class="absolute left-1/2 top-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[-12.5deg]">
      <div
        v-for="num in 6"
        :key="num"
        class="border-b-[1vh] border-white opacity-[.15] [&_div]:h-[30vh] [&_div]:bg-[length:auto_100%] [&_div]:odd:animate-[marquee_40s_linear_reverse_infinite] [&_div]:odd:bg-[url('@/assets/img/text-decoration.png')] [&_div]:even:animate-[marquee_40s_linear_infinite] [&_div]:even:bg-[url('@/assets/img/arrow-decoration.png')]"
      >
        <div />
      </div>
    </div>
    <div class="absolute inset-0 bg-[repeating-linear-gradient(40deg,rgba(255,255,255,.1),rgba(255,255,255,.1)_3px,rgba(255,255,255,.15)_3px,rgba(255,255,255,.15)_8px)]" />
    <div class="absolute bottom-[-20%] left-1/2 top-[20%] -translate-x-1/2 sm:bottom-[-60%] sm:top-[10%]">
      <img
        id="character"
        class="h-full max-w-none"
        src="@/assets/img/character.png"
        alt="cd"
      >
    </div>
  </div>
</template>
