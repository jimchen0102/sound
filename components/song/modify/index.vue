<script setup lang="ts">
const { isModalOpen } = useModal('modify')
</script>

<template>
  <h2 class="text-2xl font-bold text-white lg:text-3xl">
    我的歌曲
  </h2>
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
