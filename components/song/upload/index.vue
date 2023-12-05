<script setup lang="ts">
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from '@/types'

const { $toast } = useNuxtApp()

const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()

const uploads = ref<Upload[]>([])

const handleUploadFile = (files: File[]) => {
  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') {
      $toast.error('檔案格式不符')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      $toast.error('檔案大小超過 10MB')
      return
    }
    const id = uuidv4()
    const songRef = doc(db, 'songs', id)
    const songStorageRef = storageRef(storage, `songs/${user.value?.uid}/${id}`)
    const task = uploadBytesResumable(songStorageRef, file)
    uploads.value.push({
      progress: 0,
      state: '',
      task,
      title: file.name
    })
    const index = uploads.value.length - 1
    task.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploads.value[index].progress = progress
      },
      () => {
        uploads.value[index].state = 'error'
      },
      async () => {
        const song = {
          cover: '',
          createdAt: serverTimestamp(),
          description: '',
          displayName: user.value?.displayName,
          genre: '無',
          id,
          url: '',
          tags: [],
          title: file.name.replace(/\.[^/\\.]+$/, ''),
          uid: user.value?.uid
        }
        try {
          song.url = await getDownloadURL(task.snapshot.ref)
          await setDoc(songRef, song)
          uploads.value[index].state = 'success'
        } catch (error) {
          $toast.error('歌曲上傳失敗')
        }
      }
    )
  })
}

onUnmounted(() => {
  uploads.value.forEach((upload) => {
    upload.task.cancel()
  })
})
</script>

<template>
  <div class="mt-5 lg:mt-7.5">
    <SongUploadFile @upload-file="handleUploadFile" />
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
