<template>
  <div
    id="loading"
    class="fixed inset-0 z-[1002] flex items-center justify-center overflow-hidden"
  >
    <div
      id="loadingArrow"
      class="absolute left-0 top-0 h-full w-[200%]"
    >
      <div class="absolute right-0 top-0 h-full w-3/4 bg-[#030303]" />
      <div class="absolute left-0 top-0 h-full w-1/2">
        <div class="absolute right-0 top-0 h-full w-[60%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="100%"
            height="100%"
            fill="#232323"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 3.33,10 0,20 16.67,20 20,10 16.67,0 " />
          </svg>
        </div>
        <div class="absolute left-0 top-0 h-full w-[60%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="100%"
            height="100%"
            fill="#565656"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 3.33,10 0,20 16.67,20 20,10 16.67,0 " />
          </svg>
        </div>
      </div>
      <div class="absolute inset-0 bg-[repeating-linear-gradient(40deg,#030303,#030303_3px,transparent_3px,transparent_8px)]" />
    </div>
    <div
      id="loadingLogo"
      class="relative"
    >
      <img
        src="@/assets/img/sound-logo.svg"
        alt="sound"
      >
    </div>
  </div>
</template>
