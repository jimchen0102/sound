<script setup lang="ts">
import { IconCheck, IconAlertCircle } from '@tabler/icons-vue'
import type { Upload } from '@/types'

defineProps<{
  upload: Upload
}>()
</script>

<template>
  <div>
    <h3 class="flex items-center gap-x-2 text-sm text-white lg:text-base">
      {{ upload.title }}
      <IconCheck
        v-if="upload.state === 'success'"
        class="text-primary"
      />
      <IconAlertCircle
        v-if="upload.state === 'error'"
        class="text-danger"
      />
    </h3>
    <div class="relative mt-2 h-8 rounded-full bg-[#212121] lg:h-10">
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
