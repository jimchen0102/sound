<script setup lang="ts">
import {
  serverTimestamp,
  FieldValue
} from 'firebase/firestore'

interface Upload {
  createdAt: FieldValue
  title: string
}

const uploads = ref<Upload[]>([])

function uploadFile (files: File[]) {
  files.forEach((file) => {
    uploads.value.push({
      createdAt: serverTimestamp(),
      title: file.name.replace(/\.[^/\\.]+$/, '')
    })
  })
}
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    上傳歌曲
  </h2>
  <div class="mt-5 lg:mt-7.5">
    <SongUploadFile @upload-file="uploadFile" />
    <ul class="mt-5 space-y-5 lg:mt-7.5">
      <li
        v-for="upload in uploads"
        :key="upload.title"
      >
        <SongUploadPreview :upload="upload" />
      </li>
    </ul>
  </div>
</template>
