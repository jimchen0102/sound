<script setup lang="ts">
import { signInWithEmailAndPassword, Auth } from 'firebase/auth'
import * as yup from 'yup'
import { AuthType } from '@/types'

defineEmits<{(e: 'change-auth-type', value: AuthType): void}>()

const auth = useFirebaseAuth()
const route = useRoute()

const { isModalOpen } = useModal('auth')

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required('電子郵件為必填').email('須為有效的電子信箱'),
    password: yup.string().required('密碼為必填')
  })
})

const onSubmit = handleSubmit(async ({ email, password }) => {
  await signInWithEmailAndPassword(auth as Auth, email, password)
  isModalOpen.value = false
  if (route.query.redirect) await navigateTo(`${route.query.redirect}`)
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="space-y-5">
      <BaseInput
        id="loginEmail"
        name="email"
        label="電子郵件"
      />
      <BaseInput
        id="loginPassword"
        name="password"
        type="password"
        label="密碼"
      />
    </div>
    <button class="relative mt-10 block h-15 w-full rounded-full bg-[#fff645]">
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
  </form>
  <p class="mt-5 text-center font-bold text-white lg:text-lg">
    還沒有帳號嗎？
    <span
      class="cursor-pointer underline"
      @click="$emit('change-auth-type', AuthType.REGISTER)"
    >
      註冊
    </span>
  </p>
</template>
