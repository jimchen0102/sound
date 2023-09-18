<script setup lang="ts">
import { signInWithEmailAndPassword, signOut, Auth } from 'firebase/auth'

const auth = useFirebaseAuth()
const user = useCurrentUser()

const isLoading = ref(false)

const signIn = async () => {
  isLoading.value = true
  await signInWithEmailAndPassword(auth as Auth, 'aa@aa.aa', 'aaaaaa')
  isLoading.value = false
}
</script>

<template>
  <header class="fixed left-0 top-0 z-[999] flex h-[100px] w-full items-center justify-between px-5 md:px-10 xl:h-[140px] xl:px-20">
    <NuxtLink to="/">
      <img
        src="@/assets/img/sound-logo.svg"
        alt=""
        width="100"
        height="50"
        class="w-20 sm:w-auto"
      >
    </NuxtLink>
    <nav>
      <ul
        v-if="user"
        class="flex items-center gap-x-2.5"
      >
        <li>
          <NuxtLink
            to="/manage"
            class="flex h-[60px] items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
              <div class="h-5 w-5 rounded-full bg-white" />
            </div>
            <span class="font-bold text-white">
              我的歌曲
            </span>
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            class="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#030303] text-white"
            @click="signOut(auth as Auth)"
          >
            登出
          </button>
        </li>
      </ul>
      <button
        v-else
        type="button"
        class="flex h-[60px] items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6"
        @click="signIn"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
          <IconUser
            width="20"
            height="20"
          />
        </div>
        <span class="font-bold text-white">
          登入 / 註冊
        </span>
      </button>
    </nav>
  </header>
</template>
