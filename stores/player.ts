import { defineStore } from 'pinia'
import { DocumentData } from 'firebase/firestore'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const currentSound = ref<DocumentData>()
  const sound = ref<Howl>()
  const volume = ref(0.25)

  const isSoundPlaying = computed(() => sound.value?.playing())

  function createSound (song: DocumentData) {
    if (song.docID === currentSound.value?.docID) return toggleSound()

    if (sound.value && song.docID !== currentSound.value?.docID) sound.value.unload()

    currentSound.value = song

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value
    })
    sound.value.play()
  }

  function toggleSound () {
    sound.value?.playing() ? sound.value?.pause() : sound.value?.play()
  }

  return {
    currentSound,
    sound,
    volume,
    isSoundPlaying,
    createSound,
    toggleSound
  }
})
