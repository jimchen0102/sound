<script setup lang="ts">
import { signInWithEmailAndPassword, Auth } from 'firebase/auth'
import { AuthType } from '@/types'

defineEmits<{(e: 'change-auth-type', value: AuthType): void}>()

const auth = useFirebaseAuth()
const route = useRoute()
const { isModalOpen } = useModal('auth')

const handleSubmit = async () => {
  await signInWithEmailAndPassword(auth as Auth, 'aa@aa.aa', 'aaaaaa')
  isModalOpen.value = false
  if (route.query.redirect) await navigateTo(`${route.query.redirect}`)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <fieldset>
      <div>
        <label
          for="loginEmail"
          class="font-bold text-white lg:text-lg"
        >
          電子郵件
        </label>
        <div class="relative">
          <input
            id="loginEmail"
            type="email"
            class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
          >
        </div>
      </div>
      <div class="mt-5">
        <label
          for="loginPassword"
          class="font-bold text-white lg:text-lg"
        >
          密碼
        </label>
        <div class="relative">
          <input
            id="loginPassword"
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
          <Icon
            name="User"
            :size="20"
          />
        </div>
        <span class="text-lg font-bold">
          登入
        </span>
      </button>
    </fieldset>
    <p class="mt-5 text-center font-bold text-white lg:text-lg">
      還沒有帳號嗎？
      <span
        class="cursor-pointer underline"
        @click="$emit('change-auth-type', AuthType.REGISTER)"
      >
        註冊
      </span>
    </p>
  </form>
</template>
