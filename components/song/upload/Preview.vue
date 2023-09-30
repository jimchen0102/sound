<script setup lang="ts">
import type { Upload } from '@/types'

defineProps<{
  upload: Upload
}>()
</script>

<template>
  <div>
    <h3 class="text-sm text-white lg:text-base">
      {{ upload.title }}
      <span
        v-if="upload.state"
        :class="
          upload.state === 'success' ? 'text-primary' : 'text-danger'
        "
      >
        {{ upload.state === 'success' ? '(上傳成功)' : '(上傳失敗)' }}
      </span>
    </h3>
    <div class="relative mt-2 h-10 rounded-full bg-[#212121]">
      <div
        class="absolute left-0 top-0 h-full overflow-hidden rounded-full bg-[#696969] transition-[width] duration-100"
        :class="{
          '!bg-gradient-to-r from-primary to-secondary': upload.state === 'success',
          '!bg-danger': upload.state === 'error'
        }"
        :style="{ width: `${upload.progress}%` }"
      >
        <div class="absolute inset-0 bg-[url('@/assets/img/progress-arrow.svg')] bg-[length:50px_40px]" />
      </div>
    </div>
  </div>
</template>
