<script setup lang="ts">
import { collection, where } from 'firebase/firestore'

const route = useRoute()

const db = useFirestore()
const commentCollection = collection(db, 'comments')

const {
  document: comments
} = useLimitDocument(12, commentCollection, where('songID', '==', route.params.id))
</script>

<template>
  <div class="mt-15 flex items-center justify-between gap-x-7.5 lg:mt-10 lg:justify-start">
    <span class="text-white">
      {{ comments.length }} 則留言
    </span>
    <div class="relative text-white">
      <select class="block h-10 w-[180px] appearance-none bg-transparent outline-none">
        <option
          value="descending"
          class="text-black"
        >
          排序依據 (由新到舊)
        </option>
        <option
          value="ascending"
          class="text-black"
        >
          排序依據 (由舊到新)
        </option>
      </select>
      <div class="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
        <Icon name="Adjust" />
      </div>
    </div>
  </div>

  <div class="relative mt-5">
    <CommentPostForm />
  </div>

  <div class="relative mt-7.5">
    <ul class="space-y-7.5">
      <li
        v-for="comment in comments"
        :key="comment.docID"
      >
        <CommentPostPreview :comment="comment" />
      </li>
    </ul>
  </div>
</template>
