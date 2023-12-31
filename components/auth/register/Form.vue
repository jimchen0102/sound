<script setup lang="ts">
import type { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import * as yup from 'yup'
import { IconAlertCircle, IconUser, IconLoader } from '@tabler/icons-vue'
import { AuthType } from '@/types'

defineEmits<{
  (e: 'change-auth-type', value: AuthType): void
}>()

const route = useRoute()

const auth = useFirebaseAuth()
const db = useFirestore()

const { isModalOpen } = useModal('auth')
const isLoading = ref(false)
const errorMessage = ref('')

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string().required('姓名為必填'),
      email: yup.string().required('電子郵件為必填').email('須為有效的電子信箱'),
      password: yup.string().required('密碼為必填').min(6, '不能小於 6 個字元'),
      passwordConfirm: yup.string().required('確認密碼為必填').oneOf([yup.ref('password')], '密碼不一致')
    })
  )
})

const onSubmit = handleSubmit(async ({ name, email, password }) => {
  isLoading.value = true
  try {
    const credential = await createUserWithEmailAndPassword(auth!, email, password)
    await setDoc(doc(db, 'users', credential.user.uid), { name, email })
    await updateProfile(credential.user, { displayName: name })
    isModalOpen.value = false
    if (route.query.redirect) {
      await navigateTo(`${route.query.redirect}`)
    }
  } catch (error) {
    const errorCode = (error as FirebaseError).code
    if (errorCode === 'auth/email-already-in-use') {
      errorMessage.value = '電子郵件已經被使用'
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
        name="name"
        label="該如何稱呼你？"
      />
      <BaseInput
        name="email"
        label="你的電子郵件是什麼？"
      />
      <BaseInput
        name="password"
        type="password"
        label="密碼"
      />
      <BaseInput
        name="passwordConfirm"
        type="password"
        label="確認密碼"
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
      <span class="text-lg font-bold">
        註冊
      </span>
    </button>
    <p class="mt-5 text-center font-bold text-white">
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
