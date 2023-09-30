<script setup lang="ts">
const emit = defineEmits<{
  (e: 'upload-file', value: File[]): void
}>()

const isDragOver = ref(false)
const uploadEl = ref<HTMLInputElement | null>(null)

const handleChange = (event: Event | DragEvent) => {
  isDragOver.value = false
  const files = (event as DragEvent).dataTransfer
    ? [...((event as DragEvent).dataTransfer as DataTransfer).files]
    : [...((event.target as HTMLInputElement).files as FileList)];
  (uploadEl.value as HTMLInputElement).value = ''
  emit('upload-file', files)
}
</script>

<template>
  <label
    for="upload"
    class="flex aspect-square items-center justify-center rounded-[30px] border-2 border-dashed border-[#696969] text-white hover:border-white hover:bg-[#212121] md:aspect-[3/2]"
    :class="{
      'border-white bg-[#212121]': isDragOver
    }"
    @dragend.prevent.stop="isDragOver = false"
    @dragover.prevent.stop="isDragOver = true"
    @dragenter.prevent.stop="isDragOver = true"
    @dragleave.prevent.stop="isDragOver = false"
    @drop.prevent.stop="handleChange"
  >
    <div>
      <Icon
        name="IconCloudUpload"
        :size="40"
        class="mx-auto"
      />
      <h3 class="mt-2.5 text-center text-xl font-bold">
        拖曳歌曲至此，或
        <span class="cursor-pointer text-primary underline">
          選擇檔案
        </span>
        <br>
        <span class="text-sm text-white/50">
          支援檔案類型：MP3。≤10MB
        </span>
      </h3>
    </div>
  </label>

  <input
    id="upload"
    ref="uploadEl"
    type="file"
    multiple
    class="hidden"
    @change="handleChange"
  >
</template>
