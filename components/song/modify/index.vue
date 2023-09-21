<script setup lang="ts">
const { isModalOpen } = useModal('modify')
</script>

<template>
  <div class="mt-5 lg:mt-7.5">
    <ul>
      <li class="border-b border-white/10">
        <SongModifyPreview />
      </li>
    </ul>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <SongModifyModal v-if="isModalOpen" />
    </Transition>
  </Teleport>
</template>
