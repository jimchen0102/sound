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
const coll = collection(db, 'songs')

const uploads = ref<Upload[]>([])

const uploadFile = (files: File[]) => {
  files.forEach((file) => {
    if (file.size > 10 * 1024 * 1024 || file.type !== 'audio/mpeg') return
    const songRef = storageRef(storage, `songs/${user.value?.uid}/${uuidv4()}`)
    const task = uploadBytesResumable(songRef, file)
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
          coverId: '',
          coverUrl: '',
          createdAt: serverTimestamp(),
          description: '',
          displayName: user.value?.displayName,
          genre: '無',
          songId: task.snapshot.ref.name,
          songUrl: '',
          tags: [],
          title: file.name.replace(/\.[^/\\.]+$/, ''),
          uid: user.value?.uid
        }
        try {
          song.songUrl = await getDownloadURL(task.snapshot.ref)
          const songRef = await addDoc(coll, song)
          const snapshot = await getDoc(songRef)
          uploads.value[index].state = 'success'
          $emit('add-song-document', snapshot)
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
        :key="upload.title"
      >
        <SongUploadPreview :upload="upload" />
      </li>
    </ul>
  </div>
</template>
