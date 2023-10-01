<script setup lang="ts">
import { IconAlertCircle } from '@tabler/icons-vue'

const props = defineProps<{
  name: string
  label: string
}>()

const { value, errorMessage, handleChange } = useField<string>(
  () => props.name, undefined, {
    validateOnValueUpdate: false
  })
</script>

<template>
  <div>
    <label class="font-bold text-white lg:text-lg">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <textarea
        :value="value"
        class="block h-35 w-full resize-none rounded-[30px] border-[3px] border-transparent bg-[#030303] px-6 py-4 leading-[1.75] text-white outline-none placeholder:text-[#696969] focus:border-[#696969]"
        :class="{
          '!border-danger': errorMessage
        }"
        @change="handleChange"
      />
      <div
        v-if="errorMessage"
        class="absolute right-5 top-1/2 -translate-y-1/2 text-danger"
      >
        <IconAlertCircle />
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
