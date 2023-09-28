<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const user = useCurrentUser()
</script>

<template>
  <div class="relative mt-25 min-h-[calc(100vh-100px)] rounded-t-[40px] bg-[#030303] px-5 pb-35 pt-12.5 lg:mt-35 lg:min-h-[calc(100vh-140px)] lg:rounded-t-[60px] lg:px-10 lg:pt-20 xl:px-20">
    <div class="mx-auto max-w-[1500px]">
      <div class="grid grid-cols-1 gap-x-10 gap-y-15 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <h2 class="text-2xl font-bold text-white lg:text-3xl">
            我的歌曲
          </h2>
          <SongModify
            :where="['uid', '==', user?.uid]"
            :limit="12"
          />
        </div>
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-white lg:text-3xl">
            探索歌曲
          </h2>
          <SongBadge
            :where="['uid', '!=', user?.uid]"
            :limit="12"
          />
        </div>
      </div>
    </div>
  </div>
</template>
