<template>
  <label
    for="uploadFile"
    class="flex aspect-square items-center justify-center rounded-[30px] border-2 border-dashed border-[#696969] text-white hover:bg-[#212121] md:aspect-[3/2]"
  >
    <div>
      <Icon
        name="Upload"
        :size="40"
        class="mx-auto"
      />
      <h3 class="mt-2.5 text-center text-xl font-bold">
        拖曳歌曲至此，或
        <span class="cursor-pointer text-[#fff645] underline">
          選擇檔案
        </span>
        <br>
        <span class="text-sm text-white/50">
          支援檔案類型：MP3。≤10MB
        </span>
      </h3>
    </div>
  </label>
  <input
    id="uploadFile"
    type="file"
    class="hidden"
    multiple
  >
</template>
