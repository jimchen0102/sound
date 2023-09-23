<script setup lang="ts">
import { FieldValue } from 'firebase/firestore'

interface Upload {
  createdAt: FieldValue
  title: string
}

defineProps<{
  upload: Upload
}>()
</script>

<template>
  <div>
    <h3 class="text-sm text-white lg:text-base">
      {{ upload.title }}
      <span class="text-[#fff645]">(上傳成功)</span>
      <!-- <span class="text-[#ee2828]">(上傳失敗)</span> -->
    </h3>
    <div class="relative mt-2 h-10 rounded-full bg-[#212121]">
      <div
        class="absolute left-0 top-0 h-full overflow-hidden rounded-full bg-[#696969]"
        :style="{ width: '60%' }"
      >
        <div class="absolute inset-0 bg-[url('@/assets/img/progress-arrow.svg')] bg-[length:50px_40px]" />
      </div>
    </div>
  </div>
</template>
