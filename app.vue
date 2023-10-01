<script setup lang="ts">
import gsap from 'gsap'

const onEnter = (_el: Element, done: () => void) => {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set('#transition', {
        autoAlpha: 0
      })
      done()
    }
  })
  tl
    .set('#transitionBackground', { opacity: 1 })
    .set('#transitionArrow', { x: '-33.33333%' })
    .to('#transitionArrow', { x: '33.33333%', duration: 0.75 })
    .to('#transitionBackground', { opacity: 0, duration: 0.5 }, 0.25)
}

const onLeave = (_el: Element, done: () => void) => {
  const tl = gsap.timeline({
    onComplete: () => {
      done()
    }
  })
  tl.set('#transition', { autoAlpha: 1 })
    .set('#transitionBackground', { opacity: 0 })
    .set('#transitionArrow', { x: '-100%' })
    .to('#transitionBackground', { opacity: 1, duration: 0.5 })
    .to('#transitionArrow', { x: '-33.33333%', duration: 0.75 }, 0)
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        mode: 'out-in',
        onEnter,
        onLeave
      }"
    />
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
