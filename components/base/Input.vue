<script setup lang="ts">
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
    <label class="font-bold text-white lg:text-lg">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <input
        :value="value"
        :type="type"
        class="block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
        :class="{
          '!border-danger': errorMessage
        }"
        @change="handleChange"
      >
      <div
        v-if="errorMessage"
        class="absolute right-5 top-1/2 -translate-y-1/2 text-danger"
      >
        <Icon name="IconAlertCircle" />
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
