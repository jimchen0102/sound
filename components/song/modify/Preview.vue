<script setup lang="ts">
import {
  doc,
  deleteDoc,
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
  (e: 'open-modal', value: DocumentData): void,
  (e: 'delete-song', value: string): void
}>()

const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()

const handleDeleteSong = async () => {
  const songRef = storageRef(storage, `songs/${user.value?.uid}/${props.song.id}`)
  try {
    await deleteObject(songRef)
    await deleteDoc(doc(db, 'songs', props.song.id))
    emit('delete-song', props.song.id)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="relative">
    <NuxtLink
      :to="`/song/${song.id}`"
      class="block aspect-square overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]"
    >
      <img
        v-if="song.cover"
        :src="song.cover"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
    </NuxtLink>
    <div class="absolute right-5 top-5 flex gap-x-2">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
        @click="$emit('open-modal', song)"
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
      :to="`/song/${song.id}`"
      class="hover:underline"
    >
      {{ song.title }}
    </NuxtLink>
  </h2>
  <h3 class="mt-1.5 text-sm text-white/50">
    {{ song.displayName }} • {{ song.genre }} • {{ formatCreatedAt(song.createdAt) }}
  </h3>
</template>
