<template>
  <div class="flex items-center gap-x-4 rounded p-2 hover:bg-[#212121]">
    <div class="relative aspect-square w-16 cursor-pointer overflow-hidden rounded bg-gradient-to-b from-[#383838] to-[#767676]">
      <img
        class="h-full w-full object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/sound-ebc19.appspot.com/o/covers%2FqEVcwq1gQhgKK21zz2v0rfjKnnp1%2F51421d7d-a2df-44e4-90fa-94ee5dd8c9f0?alt=media&amp;token=28df2fa5-d39d-44fd-bfc2-4cb76f4a6eb9"
        alt=""
      >
      <div class="absolute inset-0 z-10 flex items-center justify-center bg-black/10 text-white">
        <Icon
          name="Play"
          :size="20"
        />
      </div>
    </div>
    <div class="flex-1">
      <h3 class="line-clamp-1 font-bold text-white">
        <NuxtLink to="/song/D3yU1dTaU4YQhtNiOpGn">
          陳約翰 - 當我以為
        </NuxtLink>
      </h3>
      <h4 class="mt-1 line-clamp-1 text-sm text-white/50">
        秘密 • 古典 • 9 個月前
      </h4>
    </div>
  </div>
</template>
