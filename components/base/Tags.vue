<script setup lang="ts">
const props = defineProps<{
  name: string
  label: string
}>()

const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

const { value } = useField<string[]>(() => props.name)

const addTag = () => {
  if (!input.value || value.value.includes(input.value)) {
    input.value = ''
    return
  }
  value.value.push(input.value)
  input.value = ''
}

const deleteTag = (index: number) => {
  value.value.splice(index, 1)
}
</script>

<template>
  <div>
    <label class="font-bold text-white lg:text-lg">
      {{ label }}
    </label>
    <div
      class="mt-2 flex cursor-text flex-wrap gap-2 rounded-[30px] border-[3px] border-transparent bg-[#030303] px-4 py-1.5 focus:border-[#696969] lg:px-6 lg:py-3"
      @click="inputEl?.focus()"
    >
      <div
        v-for="(tag, index) in value"
        :key="tag"
        class="flex h-7.5 cursor-pointer items-center gap-x-1 rounded-full bg-[#383838] px-2.5 text-sm text-white hover:line-through"
        @click="deleteTag(index)"
      >
        <span class="opacity-50">
          #
        </span>
        <span>
          {{ tag }}
        </span>
      </div>
      <input
        ref="inputEl"
        v-model="input"
        type="text"
        class="w-30 bg-transparent text-white outline-none"
        @keypress.enter.prevent="addTag"
      >
    </div>
  </div>
</template>
