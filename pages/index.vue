<script setup lang="ts">
import { onAuthStateChanged, Auth } from 'firebase/auth'

const auth = useFirebaseAuth()
onAuthStateChanged(auth as Auth, (user) => {
  console.log('onAuthStateChanged', user)
})
</script>

<template>
  <div
    class="relative mt-[100vh] rounded-t-[40px] bg-[#030303] px-5 pb-[140px] pt-[50px] lg:rounded-t-[60px] lg:px-10 lg:pb-[140px] lg:pt-20 xl:px-20"
  >
    <div class="mx-auto max-w-[1500px]">
      <h1 class="text-2xl font-bold text-white md:text-3xl xl:text-4xl">
        探索歌曲
        <IconPlay />
      </h1>
      <div class="mt-[30px] grid grid-cols-6 gap-x-6 gap-y-10">
        <div>
          <div class="group relative">
            <NuxtLink
              to="/song/D3yU1dTaU4YQhtNiOpGn"
              class="block aspect-square overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sound-ebc19.appspot.com/o/covers%2FqEVcwq1gQhgKK21zz2v0rfjKnnp1%2F51421d7d-a2df-44e4-90fa-94ee5dd8c9f0?alt=media&amp;token=28df2fa5-d39d-44fd-bfc2-4cb76f4a6eb9"
                alt=""
                class="h-full w-full object-cover"
              >
            </NuxtLink>
            <button
              type="button"
              class="invisible absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#030303] text-white opacity-0 group-hover:visible group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M8.72154 2.54687C6.73333 1.15374 4 2.57604 4 5.00375V18.9965C4 21.4243 6.73336 22.8466 8.72156 21.4534L18.7297 14.4406C20.4229 13.2541 20.4229 10.746 18.7297 9.55955L8.72154 2.54687Z" />
              </svg>
            </button>
          </div>
          <h2 class="mt-4 line-clamp-2 font-bold leading-tight text-white">
            <NuxtLink
              to="/song/D3yU1dTaU4YQhtNiOpGn"
              class="hover:underline"
            >
              陳約翰 - 當我以為
            </NuxtLink>
          </h2>
          <h3 class="mt-1.5 text-sm text-white/50">
            秘密 • 古典 • 9 個月前
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
