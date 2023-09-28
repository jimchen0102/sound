<script setup lang="ts">
import { Query } from '@/types'

const props = defineProps<Query>()

const {
  document: songs,
  isPending,
  observerEl
} = useQueryDocument('songs', {
  where: props.where,
  orderBy: props.orderBy,
  limit: props.limit
})
</script>

<template>
  <div class="relative mt-5 lg:mt-7.5">
    <ul>
      <li
        v-for="song in songs"
        :key="song.id"
        class="border-b border-white/10"
      >
        <SongBadgePreview :song="song" />
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
