<script setup lang="ts">
import { createUserWithEmailAndPassword, Auth } from 'firebase/auth'
import * as yup from 'yup'
import { AuthType } from '@/types'

defineEmits<{(e: 'change-auth-type', value: AuthType): void}>()

const auth = useFirebaseAuth()
const route = useRoute()

const { isModalOpen } = useModal('auth')

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('姓名為必填'),
    email: yup.string().required('電子郵件為必填').email('須為有效的電子信箱'),
    password: yup.string().required('密碼為必填').min(6, '不能小於 6 個字元'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], '密碼不一致')
  })
})

const onSubmit = handleSubmit(async ({ name, email, password, passwordConfirm }) => {
  console.log(name, email, password, passwordConfirm)
  await createUserWithEmailAndPassword(auth as Auth, 'aa@aa.aa', 'aaaaaa')
  isModalOpen.value = false
  if (route.query.redirect) await navigateTo(`${route.query.redirect}`)
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="space-y-5">
      <BaseInput
        name="name"
        label="該如何稱呼你？"
      />
      <BaseInput
        name="email"
        label="你的電子郵件是什麼？"
      />
      <BaseInput
        name="password"
        label="密碼"
      />
      <BaseInput
        name="passwordConfirm"
        label="確認密碼"
      />
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
        註冊
      </span>
    </button>
    <p class="mt-5 text-center font-bold text-white lg:text-lg">
      已經有帳號了？
      <span
        class="cursor-pointer underline"
        @click="$emit('change-auth-type', AuthType.LOGIN)"
      >
        登入
      </span>
    </p>
  </form>
</template>
