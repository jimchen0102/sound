<script setup lang="ts">
import {
  addDoc,
  getDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from '@/types'

const { $emit } = useNuxtApp()

const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()
const songsCollection = collection(db, 'songs')

const uploads = ref<Upload[]>([])

const uploadFile = (files: File[]) => {
  files.forEach((file) => {
    if (file.size > 10 * 1024 * 1024 || file.type !== 'audio/mpeg') return
    const songRef = storageRef(storage, `songs/${uuidv4()}`)
    const task = uploadBytesResumable(songRef, file)
    uploads.value.push({
      task,
      name: file.name,
      progress: 0,
      state: ''
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
          createdAt: serverTimestamp(),
          uuid: task.snapshot.ref.name,
          uid: user.value?.uid,
          displayName: user.value?.displayName,
          title: file.name.replace(/\.[^/\\.]+$/, ''),
          description: '',
          tags: [],
          coverUrl: '',
          genre: '',
          url: ''
        }
        try {
          song.url = await getDownloadURL(task.snapshot.ref)
          const songRef = await addDoc(songsCollection, song)
          const snapshot = await getDoc(songRef)
          uploads.value[index].state = 'success'
          $emit('add-song', snapshot)
        } catch (error) {
          console.log(error)
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
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    上傳歌曲
  </h2>
  <div class="mt-5 lg:mt-7.5">
    <SongUploadFile @upload-file="uploadFile" />
    <ul class="mt-5 space-y-5 lg:mt-7.5">
      <li
        v-for="upload in uploads"
        :key="upload.name"
      >
        <SongUploadPreview :upload="upload" />
      </li>
    </ul>
  </div>
</template>
