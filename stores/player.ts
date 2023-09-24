import { defineStore } from 'pinia'
import { DocumentData } from 'firebase/firestore'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const currentSound = ref<DocumentData>()
  const sound = ref<Howl>()
  const seek = ref(0)
  const duration = ref(0)
  const volume = ref(0.25)
  const progress = ref(0)

  const isSoundPlaying = computed(() => sound.value?.playing() || false)

  const createSound = (song: DocumentData) => {
    if (song.docID === currentSound.value?.docID) return toggleSound()

    if (sound.value && song.docID !== currentSound.value?.docID) sound.value.unload()

    currentSound.value = song

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value,
      onplay () {
        updateProgress()
      }
    })
    sound.value.play()
  }

  const toggleSound = () => {
    if (!sound.value) return

    sound.value.playing() ? sound.value.pause() : sound.value.play()
  }

  const updateProgress = () => {
    if (!sound.value) return

    seek.value = sound.value.seek()
    duration.value = sound.value.duration()
    progress.value = sound.value.seek() / sound.value.duration()
    requestAnimationFrame(updateProgress)
  }

  const updateSeek = () => {
    // const seconds = sound.value?.duration() * progress.value
    // sound.value.seek(seconds)
    // sound.value.play()
  }

  return {
    currentSound,
    sound,
    seek,
    duration,
    volume,
    progress,
    isSoundPlaying,
    createSound,
    toggleSound,
    updateProgress,
    updateSeek
  }
})
