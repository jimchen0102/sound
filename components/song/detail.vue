<script setup lang="ts">
import {
  collection,
  doc,
  getDoc,
  DocumentData
} from 'firebase/firestore'

const route = useRoute()

const db = useFirestore()
const songsCollection = collection(db, 'songs')

const song = ref<DocumentData>({})

const getSongData = async () => {
  try {
    const snapshot = await getDoc(doc(songsCollection, route.params.id as string))
    if (!snapshot.exists()) return await navigateTo('/')
    song.value = {
      ...snapshot.data(),
      docID: snapshot.id
    }
  } catch (error) {
    console.log(error)
  }
}

await getSongData()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg bg-[#212121] bg-cover bg-center"
    :style="{ backgroundImage: `url('${song.coverUrl
    }')` }"
  >
    <div class="absolute inset-0 backdrop-blur-2xl backdrop-brightness-50" />
    <div class="relative aspect-square overflow-hidden bg-gradient-to-b from-[#383838] to-[#767676] sm:mx-auto sm:max-w-[400px]">
      <img
        v-if="song.coverUrl"
        :src="song.coverUrl"
        :alt="song.title"
        class="h-full w-full object-cover"
      >
    </div>
  </div>
  <div class="mt-7.5 flex gap-x-5">
    <div class="mt-1.5 flex-1 lg:mt-0">
      <h1 class="text-2xl font-bold text-white lg:text-3xl">
        {{ song.title }}
      </h1>
      <h2 class="mt-1 text-sm text-white/50">
        {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt(song.createdAt) }}
      </h2>
    </div>
    <button
      type="button"
      class="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff645]"
    >
      <Icon name="Play" />
    </button>
  </div>
  <p class="mt-5 whitespace-pre-wrap leading-[1.75] text-white/70">
    {{ song.description }}
  </p>
  <ul class="mt-5 flex flex-wrap gap-2">
    <li v-for="tag in song.tags" :key="tag">
      <div class="flex h-7.5 items-center gap-x-1 rounded-full bg-[#212121] px-2.5 text-sm text-white">
        <span class="opacity-50">
          #
        </span>
        <span class="line-clamp-1 max-w-[120px]">
          {{ tag }}
        </span>
      </div>
    </li>
  </ul>
</template>
