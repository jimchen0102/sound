<script setup lang="ts">
import {
  collection,
  doc,
  deleteDoc,
  DocumentData
} from 'firebase/firestore'

const props = defineProps<{
  comment: DocumentData
}>()

const emit = defineEmits<{
  (e: 'delete-comment-document', value: string): void
}>()

const db = useFirestore()
const coll = collection(db, 'comments')

const handleDeleteComment = async () => {
  try {
    await deleteDoc(doc(coll, props.comment.docID))
    emit('delete-comment-document', props.comment.docID)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="absolute right-0 top-0 text-white"
      @click="handleDeleteComment"
    >
      <Icon
        name="Delete"
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
