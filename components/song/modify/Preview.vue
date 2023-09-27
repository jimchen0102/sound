<script setup lang="ts">
import {
  doc,
  deleteDoc,
  collection,
  DocumentData
} from 'firebase/firestore'
import {
  ref as storageRef,
  deleteObject
} from 'firebase/storage'

const props = defineProps<{
  song: DocumentData
}>()

const emit = defineEmits<{
  (e: 'open-modify-modal', value: DocumentData): void,
  (e: 'delete-song-document', value: string): void
}>()

const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()
const coll = collection(db, 'songs')

async function deleteSongDocument () {
  const songRef = storageRef(storage, `songs/${user.value?.uid}/${props.song.songId}`)
  const coverRef = storageRef(storage, `covers/${user.value?.uid}/${props.song.coverId}`)
  try {
    await deleteObject(songRef)
    await deleteObject(coverRef)
    await deleteDoc(doc(coll, props.song.docID))
    emit('delete-song-document', props.song.docID)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex items-center gap-x-5 rounded p-2 hover:bg-[#212121]">
    <div class="flex flex-1 items-center gap-x-4">
      <div class="relative aspect-square w-16 overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]">
        <img
          v-if="song.coverUrl"
          :src="song.coverUrl"
          :alt="song.title"
          class="h-full w-full object-cover"
        >
      </div>
      <div class="flex-1">
        <h3 class="line-clamp-1 font-bold text-white">
          <NuxtLink
            :to="`/song/${song.docID}`"
            class="hover:underline"
          >
            {{ song.title }}
          </NuxtLink>
        </h3>
        <h4 class="mt-1 line-clamp-1 text-sm text-white/50">
          {{ formatCreatedAt(song.createdAt) }}
        </h4>
      </div>
    </div>
    <div class="flex">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
        @click="$emit('open-modify-modal', song)"
      >
        <Icon
          name="Edit"
          :size="20"
        />
      </button>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
        @click="deleteSongDocument"
      >
        <Icon
          name="Delete"
          :size="20"
        />
      </button>
    </div>
  </div>
</template>
