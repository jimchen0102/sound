<script setup lang="ts">
import { IconCaretDownFilled } from '@tabler/icons-vue'
import type { Option } from '@/types'

const props = defineProps<{
  name: string
  label: string,
  options: Option[]
}>()

const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <div>
    <label class="font-bold text-white">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <select
        v-model="value"
        class="block h-12 w-full appearance-none rounded-full border-[3px] border-transparent bg-[#030303] px-4 text-white outline-none focus:border-[#696969] lg:h-15 lg:px-6"
        :class="{
          '!border-danger': errorMessage
        }"
      >
        <option
          v-for="option in options"
          :key="option.title"
          :value="option.value"
        >
          {{ option.title }}
        </option>
      </select>
      <div class="absolute right-4 top-1/2 -translate-y-1/2 text-white lg:right-6">
        <IconCaretDownFilled :size="20" />
      </div>
    </div>
    <span
      v-if="errorMessage"
      class="mt-1.5 inline-block text-sm text-danger"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
