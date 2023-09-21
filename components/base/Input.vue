<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  name: string
  type?: string
  label: string
}>(), {
  type: 'text'
})

const { value, errorMessage, handleChange } = useField(
  () => props.name, undefined, {
    validateOnValueUpdate: false
  })
</script>

<template>
  <div>
    <label
      :for="id"
      class="font-bold text-white lg:text-lg"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :value="value"
        :type="type"
        class="mt-2 block h-15 w-full rounded-full border-[3px] bg-[#030303] pl-6 pr-12 text-white outline-none"
        :class="errorMessage ? 'border-[#ee2828]' : 'border-transparent focus:border-[#696969]'"
        @change="handleChange"
      >
      <div
        v-if="errorMessage"
        class="absolute right-5 top-1/2 -translate-y-1/2 text-[#ee2828]"
      >
        <Icon name="Alert" />
      </div>
    </div>
    <span
      v-if="errorMessage"
      class="mt-1.5 inline-block text-sm text-[#ee2828]"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
