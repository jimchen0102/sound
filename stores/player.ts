import { defineStore } from 'pinia'
import type { DocumentData } from 'firebase/firestore'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const currentSound = ref<DocumentData>()
  const sound = ref<Howl>()
  const seek = ref(0)
  const duration = ref(0)
  const volume = ref(0.1)
  const progress = ref(0)

  const isSoundLoaded = computed(() => sound.value?.state() === 'loaded')
  const isSoundPlaying = computed(() => sound.value?.playing() || false)

  const createSound = (song: DocumentData) => {
    if (song.id === currentSound.value?.id) return toggleSound()
    if (sound.value instanceof Howl) sound.value.unload()
    currentSound.value = song
    sound.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value,
      onplay () {
        updateProgress()
      },
      onend () {
        sound.value?.unload()
        currentSound.value = undefined
      }
    })
    sound.value.play()
  }

  const toggleSound = () => {
    if (!sound.value || !isSoundLoaded.value) return
    isSoundPlaying.value ? sound.value.pause() : sound.value.play()
  }

  const updateProgress = () => {
    if (!sound.value) return
    seek.value = sound.value.seek()
    duration.value = sound.value.duration()
    progress.value = sound.value.seek() / sound.value.duration()
    if (isSoundPlaying) requestAnimationFrame(updateProgress)
  }

  const updateSeek = (percent: number) => {
    if (!sound.value || !isSoundLoaded.value) return
    const seconds = sound.value.duration() * percent
    sound.value.seek(seconds)
  }

  const updateVolume = (percent: number) => {
    if (!sound.value || !isSoundLoaded.value) return
    sound.value.volume(percent)
    volume.value = percent
  }

  return {
    currentSound,
    sound,
    seek,
    duration,
    volume,
    progress,
    isSoundLoaded,
    isSoundPlaying,
    createSound,
    toggleSound,
    updateProgress,
    updateSeek,
    updateVolume
  }
})
