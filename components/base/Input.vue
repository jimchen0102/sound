<script setup lang="ts">
import { IconAlertCircle } from '@tabler/icons-vue'

const props = withDefaults(defineProps<{
  name: string
  type?: string
  label: string
}>(), {
  type: 'text'
})

const { value, errorMessage, handleChange } = useField<string>(
  () => props.name, undefined, {
    validateOnValueUpdate: false
  })
</script>

<template>
  <div>
    <label class="font-bold text-white">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <input
        :value="value"
        :type="type"
        class="block h-12 w-full rounded-full border-[3px] border-transparent bg-[#030303] px-4 text-white outline-none focus:border-[#696969] lg:h-15 lg:px-6"
        :class="{
          '!border-danger': errorMessage
        }"
        @change="handleChange"
      >
      <div
        v-if="errorMessage"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-danger lg:right-5"
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
