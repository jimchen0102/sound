<script setup lang="ts">
import { onAuthStateChanged } from 'firebase/auth'
import gsap from 'gsap'

const auth = useFirebaseAuth()

onMounted(() => {
  const tl = gsap.timeline()
  tl
    .set('#loadingArrow', { x: '-50%' })
    .set('#loadingLogo', { opacity: 0, y: 60 })
    .set('#character', { y: '100%', rotate: 1440 })
    .to('#loadingLogo', { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power3' })

  onAuthStateChanged(auth!, () => {
    tl
      .to('#loadingLogo', { opacity: 0, y: -100, duration: 1, ease: 'power3.in' })
      .to('#loadingArrow', {
        x: '50%',
        duration: 0.75,
        onComplete: () => {
          gsap.set('#loading', { autoAlpha: 0 })
        }
      })
      .to('#character', {
        y: 0,
        rotate: '0',
        duration: 2.5,
        ease: 'power3'
      }, 3)
  })
})

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

useSeoMeta({
  title: 'SOUND'
})
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
