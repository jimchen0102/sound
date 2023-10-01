<script setup lang="ts">
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as yup from 'yup'
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
    errorMessage.value = '帳號或密碼錯誤'
  }
  isLoading.value = false
})
</script>

<template>
  <div
    v-if="errorMessage"
    class="mb-2.5 flex items-center justify-center gap-x-1 text-sm text-danger"
  >
    <Icon name="IconAlertCircle" />
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
      class="relative mt-10 block h-15 w-full rounded-full bg-primary hover:bg-gradient-to-b hover:from-primary hover:to-secondary"
      :disabled="isLoading"
    >
      <div class="absolute left-2.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#030303] text-white">
        <Icon
          name="IconUser"
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
