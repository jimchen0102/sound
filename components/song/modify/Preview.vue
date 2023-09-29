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
import { vOnClickOutside } from '@vueuse/components'

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

const isUserModalOpen = ref(false)

const handleUpdateSong = () => {
  isUserModalOpen.value = false
  emit('open-modal', props.song)
}

const handleDeleteSong = async () => {
  isUserModalOpen.value = false
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
  <div class="group relative">
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
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100" />
    </NuxtLink>
    <div
      v-on-click-outside.bubble="() => isUserModalOpen = false"
      class="absolute right-2 top-2 flex gap-x-2"
    >
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/20"
        @click="isUserModalOpen = !isUserModalOpen"
      >
        <Icon
          name="IconDotsVertical"
          :size="20"
        />
      </button>
      <ul
        v-show="isUserModalOpen"
        class="absolute right-0 top-[calc(100%+8px)] w-48 rounded border-2 border-white/10 bg-[#212121] py-4 text-white"
      >
        <li>
          <button
            type="button"
            class="flex w-full items-center gap-x-4 px-6 py-2 text-sm hover:bg-white/5"
            @click="handleUpdateSong"
          >
            <Icon
              name="IconEdit"
              :stroke-width="1"
            />
            編輯歌曲
          </button>
        </li>
        <li>
          <button
            type="button"
            class="flex w-full items-center gap-x-4 px-6 py-2 text-sm hover:bg-white/5"
            @click="handleDeleteSong"
          >
            <Icon
              name="IconTrash"
              :stroke-width="1"
            />
            刪除歌曲
          </button>
        </li>
      </ul>
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
