<script setup lang="ts">
import type { QueryOptions } from '@/types'

const props = defineProps<QueryOptions>()

const {
  document: comments,
  isPending,
  observerEl,
  addDocument: handleAddComment,
  deleteDocument: handleDeleteComment
} = useQueryDocument('comments', {
  where: props.where,
  orderBy: props.orderBy,
  limit: props.limit
})

const sort = ref('descending')

const sortedComments = computed(() => {
  return comments.value.slice().sort((a, b) => {
    if (sort.value === 'descending') return b.createdAt - a.createdAt
    else return a.createdAt - b.createdAt
  })
})
</script>

<template>
  <div class="mt-15 flex items-center justify-between gap-x-7.5 lg:mt-10 lg:justify-start">
    <span class="text-white">
      {{ comments.length }} 則留言
    </span>
    <div class="relative text-white">
      <select
        v-model="sort"
        class="block h-10 w-[180px] appearance-none bg-transparent outline-none"
      >
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
        <Icon
          name="IconSortDescending"
        />
      </div>
    </div>
  </div>

  <div class="relative mt-5">
    <CommentPostForm @add-comment="handleAddComment" />
  </div>

  <div class="relative mt-7.5">
    <ul class="space-y-7.5">
      <li
        v-for="comment in sortedComments"
        :key="comment.id"
      >
        <CommentPostPreview
          :comment="comment"
          @delete-comment="handleDeleteComment"
        />
      </li>
    </ul>
    <div
      ref="observerEl"
      class="absolute -bottom-15 left-1/2 -translate-x-1/2 text-white"
      :class="
        isPending ? 'visible opacity-100' : 'insivible opacity-0'
      "
    >
      <BaseLoading />
    </div>
  </div>
</template>
