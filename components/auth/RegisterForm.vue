<script setup lang="ts">
import { createUserWithEmailAndPassword, Auth } from 'firebase/auth'

const auth = useFirebaseAuth()
const route = useRoute()
const { modalType, isModalOpen } = useAuthModal()

const handleSubmit = async () => {
  await createUserWithEmailAndPassword(auth as Auth, 'aa@aa.aa', 'aaaaaa')
  isModalOpen.value = false
  if (route.query.redirect) await navigateTo(`${route.query.redirect}`)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <fieldset>
      <div>
        <label
          for="registerName"
          class="font-bold text-white lg:text-lg"
        >
          該如何稱呼你？
        </label>
        <div class="relative">
          <input
            id="registerName"
            type="text"
            class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
          >
        </div>
      </div>
      <div class="mt-5">
        <label
          for="registerEmail"
          class="font-bold text-white lg:text-lg"
        >
          你的電子郵件是什麼？
        </label>
        <div class="relative">
          <input
            id="registerEmail"
            type="email"
            class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
          >
        </div>
      </div>
      <div class="mt-5">
        <label
          for="registerPassword"
          class="font-bold text-white lg:text-lg"
        >
          密碼
        </label>
        <div class="relative">
          <input
            id="registerPassword"
            type="password"
            class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
          >
        </div>
      </div>
      <div class="mt-5">
        <label
          for="confirmRegisterPassword"
          class="font-bold text-white lg:text-lg"
        >
          確認密碼
        </label>
        <div class="relative">
          <input
            id="confirmRegisterPassword"
            type="password"
            class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
          >
        </div>
      </div>
      <button
        type="submit"
        class="relative mt-10 block h-15 w-full rounded-full bg-[#fff645]"
      >
        <div class="absolute left-2.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#030303] text-white">
          <IconUser :size="20" />
        </div>
        <span class="text-lg font-bold">
          註冊
        </span>
      </button>
    </fieldset>
    <p class="mt-5 text-center font-bold text-white lg:text-lg">
      已經有帳號了？
      <span
        class="cursor-pointer underline"
        @click="modalType = 'login'"
      >
        登入
      </span>
    </p>
  </form>
</template>
