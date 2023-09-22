<script setup lang="ts">
import { onAuthStateChanged, Auth } from 'firebase/auth'

const auth = useFirebaseAuth()

onMounted(() => {
  onAuthStateChanged(auth as Auth, (user) => {
    console.log('onAuthStateChanged', user)
  })
})
</script>

<template>
  <div class="relative mt-[100vh] rounded-t-[40px] bg-[#030303] px-5 pb-35 pt-12.5 lg:rounded-t-[60px] lg:px-10 lg:pt-20 xl:px-20">
    <div class="mx-auto max-w-[1500px]">
      <h1 class="text-2xl font-bold text-white lg:text-3xl xl:text-4xl">
        探索歌曲
      </h1>
      <SongGallery />
    </div>
  </div>
</template>
