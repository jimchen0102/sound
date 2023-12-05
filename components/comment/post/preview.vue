<script setup lang="ts">
import { doc, deleteDoc } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { IconX, IconLoader } from '@tabler/icons-vue'

const props = defineProps<{
  comment: DocumentData
}>()

const emit = defineEmits<{
  (e: 'delete-comment', value: string): void
}>()

const { $toast } = useNuxtApp()

const user = useCurrentUser()
const db = useFirestore()

const isLoading = ref(false)

const handleDeleteComment = async () => {
  isLoading.value = true
  try {
    await deleteDoc(doc(db, 'comments', props.comment.id))
    emit('delete-comment', props.comment.id)
  } catch (error) {
    $toast.error('評論刪除失敗')
  }
  isLoading.value = false
}
</script>

<template>
  <div class="relative">
    <button
      v-if="comment.uid === user?.uid"
      type="button"
      class="absolute right-0 top-0 text-white"
      @click="handleDeleteComment"
    >
      <IconLoader
        v-if="isLoading"
        :size="16"
        class="animate-spin"
      />
      <IconX
        v-else
        :size="16"
      />
    </button>
    <div class="flex items-center gap-x-2">
      <h3 class="line-clamp-1 font-bold text-white lg:text-lg">
        {{ comment.name }}
      </h3>
      <span class="text-xs text-white/50">
        {{ formatCreatedAt(comment.createdAt) }}
      </span>
    </div>
    <p class="mt-1 whitespace-pre-wrap text-sm leading-[1.75] text-white/70">
      {{ comment.content }}
    </p>
  </div>
</template>
