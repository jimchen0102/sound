<script setup lang="ts">
import {
  doc,
  updateDoc,
  DocumentData
} from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'
import { object, string } from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps<{
  song: DocumentData
}>()

const emit = defineEmits<{
  (e: 'update-song-document', value: [string, DocumentData]): void
}>()

const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()

const { isModalOpen } = useModal('modify')

const genres = [
  { title: '無', value: '無' },
  { title: '流行', value: '流行' },
  { title: '搖滾', value: '搖滾' },
  { title: '饒舌', value: '饒舌' },
  { title: '古典', value: '古典' },
  { title: '藍調', value: '藍調' },
  { title: '爵士', value: '爵士' },
  { title: '鄉村', value: '鄉村' }
]

const upload = ref<File | null>(null)
const cover = ref(props.song.cover)
const types = ['image/jpeg', 'image/png']
const reader = new FileReader()

const handleChange = (event: Event) => {
  const file = ((event.target as HTMLInputElement).files as FileList)[0]
  if (file.size > 1 * 1024 * 1024 || !types.includes(file.type)) return
  upload.value = file
  reader.readAsDataURL(file)
}

const handleFileLoaded = (event: ProgressEvent) => {
  cover.value = (event.target as FileReader).result
}

onMounted(() => {
  reader.onload = handleFileLoaded
})

const { handleSubmit } = useForm<DocumentData>({
  initialValues: {
    cover: props.song.cover,
    description: props.song.description,
    genre: props.song.genre,
    tags: props.song.tags,
    title: props.song.title
  },
  validationSchema: toTypedSchema(
    object({
      title: string().required('歌曲名稱為必填')
    })
  )
})

const onSubmit = handleSubmit(async (values) => {
  const songRef = doc(db, 'songs', props.song.id)
  if (upload.value) {
    const id = uuidv4()
    const coverRef = storageRef(storage, `covers/${user.value?.uid}/${id}`)
    try {
      const task = await uploadBytes(coverRef, upload.value)
      const url = await getDownloadURL(task.ref)
      await updateDoc(songRef, { cover: url })
      values.cover = url
    } catch (error) {
      console.log(error)
    }
  }
  try {
    await updateDoc(songRef, values)
    emit('update-song-document', [props.song.id, values])
    isModalOpen.value = false
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="fixed inset-0 z-[1000] overflow-y-auto overflow-x-hidden bg-[repeating-linear-gradient(40deg,rgba(255,255,255,.1),rgba(255,255,255,.1)_3px,rgba(255,255,255,.05)_3px,rgba(255,255,255,.05)_8px)] backdrop-blur-md">
    <div class="mx-auto my-15 flex min-h-[calc(100%-120px)] max-w-[600px] items-center">
      <div
        v-on-click-outside="() => isModalOpen = false"
        class="relative w-full"
      >
        <button
          type="button"
          class="absolute right-5 top-5 z-10 h-10 w-10 rounded-full border-[3px] border-[#212121] lg:right-7.5 lg:top-7.5"
          @click="isModalOpen = false"
        >
          <span class="absolute left-1/2 top-1/2 h-[3px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white" />
          <span class="absolute left-1/2 top-1/2 h-[3px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white" />
        </button>
        <div class="rounded-[40px] bg-[#030303] lg:rounded-[60px]">
          <div class="p-5 pt-10 lg:px-15 lg:pb-7.5 lg:pt-15">
            <h3 class="text-2xl font-bold text-white lg:text-3xl">
              編輯歌曲
            </h3>
          </div>
          <div class="rounded-[40px] bg-[#212121] px-5 py-7.5 lg:rounded-[60px] lg:p-10">
            <form @submit="onSubmit">
              <div>
                <label
                  class="relative mx-auto block aspect-square max-w-[200px] overflow-hidden rounded-lg border-2 border-dashed border-white/50 bg-gradient-to-b from-[#383838] to-[#767676] hover:border-white"
                  for="cover"
                >
                  <img
                    v-if="cover"
                    :src="cover"
                    :alt="song.title"
                    class="h-full w-full object-cover"
                  >
                  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                    <Icon
                      name="Camera"
                      :size="36"
                    />
                  </div>
                </label>
                <input
                  id="cover"
                  type="file"
                  class="hidden"
                  @change="handleChange"
                >
                <h3 class="relative mt-5 text-center font-bold text-white lg:text-xl">
                  上傳歌曲封面 <br>
                  <span class="text-sm text-white/50">
                    支援檔案類型：JPG、PNG。≤1MB
                  </span>
                </h3>
              </div>
              <div class="mt-7.5 space-y-5">
                <BaseInput
                  name="title"
                  label="歌曲名稱"
                />
                <BaseSelect
                  name="genre"
                  label="曲風"
                  :options="genres"
                />
                <BaseTextarea
                  name="description"
                  label="描述"
                />
                <BaseTags
                  name="tags"
                  label="附加標籤"
                />
              </div>
              <div
                class="relative mx-auto mt-5 flex h-15 w-50 overflow-hidden rounded-full border-[3px] border-[#030303] bg-[#212121]"
              >
                <button class="flex h-full w-1/2 items-center justify-center text-white hover:bg-[#383838]">
                  確定
                </button>
                <span class="absolute left-1/2 top-1/2 h-7.5 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-[#030303]" />
                <button
                  class="flex h-full w-1/2 items-center justify-center text-white hover:bg-[#383838]"
                  @click="isModalOpen = false"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
