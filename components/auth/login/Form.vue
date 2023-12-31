<script setup lang="ts">
import type { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as yup from 'yup'
import { IconAlertCircle, IconUser, IconLoader } from '@tabler/icons-vue'
import { AuthType } from '@/types'

defineEmits<{
  (e: 'change-auth-type', value: AuthType): void
}>()

const auth = useFirebaseAuth()
const route = useRoute()

const { isModalOpen } = useModal('auth')
const isLoading = ref(false)
const errorMessage = ref('')

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required('電子郵件為必填').email('須為有效的電子信箱'),
      password: yup.string().required('密碼為必填')
    })
  )
})

const onSubmit = handleSubmit(async ({ email, password }) => {
  isLoading.value = true
  try {
    await signInWithEmailAndPassword(auth!, email, password)
    isModalOpen.value = false
    if (route.query.redirect) {
      await navigateTo(`${route.query.redirect}`)
    }
  } catch (error) {
    const errorCode = (error as FirebaseError).code
    if (errorCode === 'auth/invalid-login-credentials') {
      errorMessage.value = '帳號或密碼錯誤'
    }
  }
  isLoading.value = false
})
</script>

<template>
  <div
    v-if="errorMessage"
    class="mb-5 flex items-center justify-center gap-x-1 rounded bg-danger p-2 text-sm text-white"
  >
    <IconAlertCircle />
    {{ errorMessage }}
  </div>
  <form @submit="onSubmit">
    <div class="space-y-5">
      <BaseInput
        name="email"
        label="電子郵件"
      />
      <BaseInput
        name="password"
        type="password"
        label="密碼"
      />
    </div>
    <button
      class="relative mt-7.5 block h-12 w-full rounded-full bg-primary hover:bg-gradient-to-b hover:from-primary hover:to-secondary lg:mt-10 lg:h-15"
      :disabled="isLoading"
    >
      <div class="absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#030303] text-white lg:h-10 lg:w-10">
        <IconLoader
          v-if="isLoading"
          :size="20"
          class="animate-spin"
        />
        <IconUser
          v-else
          :size="20"
        />
      </div>
      <span class="font-bold">
        登入
      </span>
    </button>
  </form>
  <p class="mt-5 text-center font-bold text-white">
    還沒有帳號嗎？
    <span
      class="cursor-pointer underline"
      @click="$emit('change-auth-type', AuthType.REGISTER)"
    >
      註冊
    </span>
  </p>
</template>
