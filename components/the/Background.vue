<template>
  <div class="pointer-events-none fixed inset-0 overflow-hidden">
    <div
      class="absolute inset-0 bg-[repeating-linear-gradient(40deg,#262626,#262626_3px,#181818_3px,#181818_8px)]"
    />
    <div class="absolute left-1/2 top-1/2 w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[-12.5deg]">
      <div
        v-for="num in 8"
        :key="num"
        class="h-[20vh] bg-[url('@/assets/img/sound-text-fill.svg')] bg-[length:auto_100%] odd:animate-[marquee_40s_linear_reverse_infinite] odd:opacity-[.05] even:animate-[marquee_40s_linear_infinite] even:opacity-[.025]"
      />
    </div>
    <div class="absolute bottom-[-20%] left-1/2 top-[20%] -translate-x-1/2 sm:bottom-[-60%] sm:top-[10%]">
      <img class="h-full max-w-none" src="@/assets/img/cd.png" alt="cd">
    </div>
  </div>
</template>
