<script setup lang="ts">
const { isModalOpen } = useModal('modify')
</script>

<template>
  <div class="flex items-center gap-x-5 rounded p-2 hover:bg-[#212121]">
    <div class="flex flex-1 items-center gap-x-4">
      <div class="relative aspect-square w-16 overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sound-ebc19.appspot.com/o/covers%2FqEVcwq1gQhgKK21zz2v0rfjKnnp1%2F51421d7d-a2df-44e4-90fa-94ee5dd8c9f0?alt=media&amp;token=28df2fa5-d39d-44fd-bfc2-4cb76f4a6eb9"
          alt=""
          class="h-full w-full object-cover"
        >
      </div>
      <div class="flex-1">
        <h3 class="line-clamp-1 font-bold text-white">
          <NuxtLink to="/song/D3yU1dTaU4YQhtNiOpGn">
            陳約翰 - 當我以為
          </NuxtLink>
        </h3>
        <h4 class="mt-1 line-clamp-1 text-sm text-white/50">
          9 個月前
        </h4>
      </div>
    </div>
    <div class="flex">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
        @click="isModalOpen = true"
      >
        <Icon
          name="Edit"
          :size="20"
        />
      </button>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
      >
        <Icon
          name="Delete"
          :size="20"
        />
      </button>
    </div>
  </div>
</template>
