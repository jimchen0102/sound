<script setup lang="ts">
import { collection } from 'firebase/firestore'

const route = useRoute()

const db = useFirestore()
const coll = collection(db, 'comments')

const {
  document: comments,
  isPending,
  observerEl,
  addDocument: addCommentDocument
} = useQueryDocument(coll, {
  where: ['songID', '==', route.params.id],
  limit: 12
})

const sort = ref('descending')

const sortedComments = computed(() =>
  comments.value.slice().sort((a, b) => {
    if (sort.value === 'descending') return b.createdAt - a.createdAt
    else return a.createdAt - b.createdAt
  })
)
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
        <Icon name="Adjust" />
      </div>
    </div>
  </div>

  <div class="relative mt-5">
    <CommentPostForm @add-comment-document="addCommentDocument" />
  </div>

  <div class="relative mt-7.5">
    <ul class="space-y-7.5">
      <li
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <CommentPostPreview :comment="comment" />
      </li>
    </ul>
    <div
      ref="observerEl"
      class="absolute -bottom-15 left-1/2 -translate-x-1/2 text-white"
      :class="
        isPending ? 'visible opacity-100' : 'insivible opacity-0'
      "
    >
      <div class="relative h-7 w-7">
        <div class="h-full w-full animate-[rotate_1.568s_linear_infinite]">
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-1-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-2-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-3-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
          <div class="absolute inset-0 animate-[fill-unfill-rotate_5.332s_cubic-bezier(.4,0,.2,1)_infinite,layer-4-fade-in-out_5.332s_cubic-bezier(.4,0,.2,1)_infinite] whitespace-nowrap text-white opacity-0">
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 left-0 w-[200%] rotate-[129deg] animate-[left-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-r-transparent" />
            </div>
            <div class="relative inline-block h-full w-1/2 overflow-hidden">
              <div class="absolute inset-y-0 -left-full w-[200%] rotate-[-129deg] animate-[right-spin_1.333s_cubic-bezier(.4,0,.2,1)_infinite] rounded-full border-[3px] border-b-transparent border-l-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
