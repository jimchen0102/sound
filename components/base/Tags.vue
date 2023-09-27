<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string[]): void
}>()

const tags = ref([...props.modelValue])
const tagInput = ref('')
const tagInputEl = ref<HTMLInputElement | null>(null)

const addTag = (tag: string) => {
  if (!tagInput.value || tags.value.includes(tag)) {
    tagInput.value = ''
    return
  }
  tags.value.push(tag)
  tagInput.value = ''
  emit('update:model-value', tags.value)
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
  emit('update:model-value', tags.value)
}
</script>

<template>
  <div>
    <label class="font-bold text-white lg:text-lg">
      {{ label }}
    </label>
    <div class="mt-2 flex min-h-[60px] cursor-text flex-wrap gap-2 rounded-[30px] border-[3px] border-transparent bg-[#030303] px-6 py-3 focus:border-[#696969]" @click="tagInputEl?.focus()">
      <div
        v-for="(tag,index) in tags"
        :key="tag"
        class="flex h-7.5 cursor-pointer items-center gap-x-1 rounded-full bg-[#383838] px-2.5 text-sm text-white hover:line-through"
        @click="removeTag(index)"
      >
        <span class="opacity-50">
          #
        </span>
        <span>
          {{ tag }}
        </span>
      </div>
      <input
        ref="tagInputEl"
        v-model="tagInput"
        type="text"
        class="w-30 bg-transparent text-white outline-none"
        @keypress.enter.prevent="addTag(tagInput)"
      >
    </div>
  </div>
</template>
