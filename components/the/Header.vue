<template>
  <header class="fixed left-0 top-0 z-[999] flex h-[100px] w-full items-center justify-between px-5 md:px-10 xl:h-[140px] xl:px-20">
    <NuxtLink to="/">
      SOUND
    </NuxtLink>
    <nav>
      <button
        type="button"
        class="flex h-[60px] items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
          <div class="h-5 w-5 rounded-full bg-white" />
        </div>
        <span class="font-bold text-white"> 登入 / 註冊</span>
      </button>
      <!-- <ul class="flex items-center gap-x-2.5">
        <li>
          <NuxtLink to="/manage">
            我的歌曲
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            class="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#030303] text-white"
          >
            登出
          </button>
        </li>
      </ul> -->
    </nav>
  </header>
</template>
