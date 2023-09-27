<script setup lang="ts">
import { createUserWithEmailAndPassword, updateProfile, Auth } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { object, string, ref } from 'yup'
import { AuthType } from '@/types'

defineEmits<{(e: 'change-auth-type', value: AuthType): void}>()

const route = useRoute()

const auth = useFirebaseAuth()
const db = useFirestore()
const usersCollection = collection(db, 'users')

const { isModalOpen } = useModal('auth')

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required('姓名為必填'),
      email: string().required('電子郵件為必填').email('須為有效的電子信箱'),
      password: string().required('密碼為必填').min(6, '不能小於 6 個字元'),
      passwordConfirm: string().oneOf([ref('password')], '密碼不一致')
    })
  )
})

const onSubmit = handleSubmit(async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth as Auth,
      email,
      password
    )
    const userRef = doc(usersCollection, userCredential.user.uid)
    await setDoc(userRef, {
      name,
      email
    })
    await updateProfile(userCredential.user, {
      displayName: name
    })
    isModalOpen.value = false
    if (route.query.redirect) await navigateTo(`${route.query.redirect}`)
  } catch (error) {
    console.log(error)
    // const errorCode = error.code
    // if (errorCode === 'auth/email-already-in-use') {
    //   errorCodeMessage.value = '這個電子郵件已經有人使用，請試試其他電子郵件。'
    // }
  }
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
        type="password"
        label="密碼"
      />
      <BaseInput
        name="passwordConfirm"
        type="password"
        label="確認密碼"
      />
    </div>
    <button class="relative mt-10 block h-15 w-full rounded-full bg-primary">
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
