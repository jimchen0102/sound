<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="relative mt-[100px] min-h-[calc(100vh-100px)] rounded-t-[40px] bg-[#030303] px-5 pb-35 pt-12 lg:mt-35 lg:min-h-[calc(100vh-140px)] lg:rounded-t-[60px] lg:px-10 lg:pt-20 xl:px-20">
    <div class="mx-auto max-w-[1500px]">
      <div class="grid grid-cols-1 gap-x-10 gap-y-15 lg:grid-cols-2">
        <div>
          <h2 class="text-2xl font-bold text-white md:text-3xl">
            上傳歌曲
          </h2>
          <div class="mt-5 lg:mt-7.5">
            <label
              for="uploadFile"
              class="flex aspect-square flex-col items-center justify-center gap-y-2.5 rounded-[30px] border-2 border-dashed border-[#696969] text-white sm:aspect-[3/2]"
            >
              <IconUpload :size="40" />
              <h3 class="text-center text-xl font-bold">
                拖曳歌曲至此，或
                <span class="cursor-pointer text-[#fff645] underline">
                  選擇檔案
                </span>
                <br>
                <span class="text-sm text-white/50">
                  支援檔案類型：MP3。≤10MB
                </span>
              </h3>
            </label>
            <input id="uploadFile" class="hidden" type="file">
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white md:text-3xl">
            我的歌曲
          </h2>
          <div class="mt-5 lg:mt-7.5">
            <ul>
              <li class="border-b border-white/10">
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
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 21C4 20.4477 4.44772 20 5 20H19C19.5523 20 20 20.4477 20 21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21Z" /><path d="M11.9394 5.35348C11.7441 5.15822 11.4275 5.15822 11.2322 5.35348L7.35354 9.23213C7.15828 9.42739 7.15828 9.74398 7.35354 9.93924L12.0606 14.6463C12.2559 14.8416 12.5725 14.8416 12.7678 14.6463L16.6465 10.7677C16.8417 10.5724 16.8417 10.2558 16.6465 10.0606L11.9394 5.35348Z" /><path d="M10.641 16.4987C10.8052 16.453 10.8359 16.25 10.7154 16.1295L5.87039 11.2845C5.74988 11.164 5.54686 11.1946 5.50122 11.3588V11.3588L4.04383 16.6016C3.8146 17.4263 4.57358 18.1853 5.39825 17.956L10.641 16.4987V16.4987Z" /><path d="M13.7087 2.87671C14.8803 1.70515 16.7798 1.70516 17.9513 2.87673L19.1229 4.0483C20.2945 5.21988 20.2945 7.11938 19.1229 8.29095L18.7678 8.64604C18.5725 8.8413 18.256 8.8413 18.0607 8.64604L13.3536 3.93894C13.1583 3.74367 13.1583 3.42709 13.3536 3.23183L13.7087 2.87671Z" /></svg>
                    </button>
                    <button
                      type="button"
                      class="flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.3,4.3c0.4-0.4,1-0.4,1.4,0l6.3,6.3l6.3-6.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12l6.3,6.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-6.3,6.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l6.3-6.3L4.3,5.7C3.9,5.3,3.9,4.7,4.3,4.3z" /></svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
