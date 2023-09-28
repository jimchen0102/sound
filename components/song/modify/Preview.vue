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

const handleDeleteSong = async () => {
  const songRef = storageRef(storage, `songs/${user.value?.uid}/${props.song.id}`)
  try {
    await deleteObject(songRef)
    await deleteDoc(doc(coll, props.song.docID))
    emit('delete-song-document', props.song.docID)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="relative">
    <NuxtLink
      :to="`/song/${song.docID}`"
      class="block aspect-square overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]"
    >
      <img
        v-if="song.cover.url"
        :src="song.cover.url"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
    </NuxtLink>
    <div class="absolute right-4 top-4 flex gap-x-2">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
        @click="$emit('open-modify-modal', song)"
      >
        <Icon
          name="Edit"
          :size="20"
        />
      </button>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
        @click="handleDeleteSong"
      >
        <Icon
          name="Delete"
          :size="20"
        />
      </button>
    </div>
  </div>
  <h2 class="mt-4 line-clamp-2 font-bold leading-tight text-white">
    <NuxtLink
      :to="`/song/${song.docID}`"
      class="hover:underline"
    >
      {{ song.title }}
    </NuxtLink>
  </h2>
  <h3 class="mt-1.5 text-sm text-white/50">
    {{ song.displayName }} • {{ song.genre }} • {{ formatCreatedAt(song.createdAt) }}
  </h3>
</template>
