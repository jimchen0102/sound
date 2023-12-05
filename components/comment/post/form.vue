<script setup lang="ts">
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { IconLoader } from '@tabler/icons-vue'

const emit = defineEmits<{
  (e: 'add-comment', value: DocumentData): void
}>()

const { $toast } = useNuxtApp()

const route = useRoute()

const user = useCurrentUser()
const db = useFirestore()

const { isModalOpen } = useModal('auth')
const isLoading = ref(false)

const { handleSubmit, defineInputBinds } = useForm()
const comment = defineInputBinds('comment')

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  isLoading.value = true
  const id = uuidv4()
  const commentRef = doc(db, 'comments', id)
  const comment = {
    content: values.comment,
    createdAt: serverTimestamp(),
    id,
    name: user.value?.displayName,
    songID: route.params.id,
    uid: user.value?.uid
  }
  try {
    await setDoc(commentRef, comment)
    const snapshot = await getDoc(commentRef)
    emit('add-comment', snapshot)
    resetForm()
  } catch (error) {
    $toast.error('評論新增失敗')
  }
  isLoading.value = false
})
</script>

<template>
  <form @submit="onSubmit">
    <textarea
      v-bind="comment"
      class="block h-40 w-full resize-none rounded-[30px] border-[3px] border-transparent bg-[#212121] px-7.5 py-5 leading-[1.75] text-white outline-none placeholder:text-white/70 focus:border-[#696969] disabled:cursor-not-allowed"
      :placeholder="`${user ? '發表你對這首歌的感受吧!' : '登入會員以發表評論'}`"
      :disabled="!user"
    />
    <div
      v-if="user"
      class="relative mx-auto -mt-7.5 flex h-15 w-50 overflow-hidden rounded-full border-[3px] border-[#030303] bg-[#212121]"
    >
      <button
        class="flex w-1/2 items-center justify-center gap-x-1 text-white hover:bg-[#383838]"
        :disabled="!comment.value || isLoading"
      >
        <IconLoader
          v-if="isLoading"
          :size="20"
          class="animate-spin"
        />
        留言
      </button>
      <span class="absolute left-1/2 top-1/2 h-7.5 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-[#030303]" />
      <button
        type="reset"
        class="flex w-1/2 items-center justify-center text-white hover:bg-[#383838]"
      >
        取消
      </button>
    </div>
    <button
      v-else
      type="button"
      class="relative mx-auto -mt-7.5 block h-15 w-40 rounded-full border-[3px] border-[#030303] bg-[#212121] text-white hover:bg-[#383838]"
      @click="isModalOpen = true"
    >
      登入 / 註冊
    </button>
  </form>
</template>
