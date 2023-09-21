<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  name: string
  type?: string
  label: string
}>(), {
  type: 'text'
})

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div>
    <label
      :for="id"
      class="font-bold text-white lg:text-lg"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="value"
      :type="type"
      class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] pl-6 pr-12 text-white outline-none focus:border-[#696969]"
    >
    <span
      v-if="errorMessage"
      class="mt-1.5 inline-block text-sm text-[#ee2828]"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
