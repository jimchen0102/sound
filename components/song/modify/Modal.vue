<script setup lang="ts">
const { isModalOpen } = useModal('modify')
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-[1000] overflow-y-auto overflow-x-hidden bg-[repeating-linear-gradient(40deg,rgba(255,255,255,.1),rgba(255,255,255,.1)_3px,rgba(255,255,255,.05)_3px,rgba(255,255,255,.05)_8px)] backdrop-blur-md"
    >
      <div class="mx-auto my-15 flex min-h-[calc(100%-120px)] max-w-[600px] items-center">
        <div class="relative w-full">
          <button
            type="button"
            class="absolute right-5 top-5 z-10 h-10 w-10 rounded-full border-[3px] border-[#212121] lg:right-7.5 lg:top-7.5"
            @click="isModalOpen = false"
          >
            <span class="absolute left-1/2 top-1/2 h-[3px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white" />
            <span class="absolute left-1/2 top-1/2 h-[3px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white" />
          </button>
          <div class="rounded-[40px] bg-[#030303] lg:rounded-[60px]">
            <div class="p-5 pt-10 lg:px-15 lg:pb-7.5 lg:pt-15">
              <h3 class="text-2xl font-bold text-white lg:text-3xl">
                編輯歌曲
              </h3>
            </div>
            <div class="rounded-[40px] bg-[#212121] px-5 py-7.5 lg:rounded-[60px] lg:p-10">
              <form>
                <fieldset>
                  <div>
                    <label
                      class="relative mx-auto block aspect-square max-w-[200px] overflow-hidden rounded-lg border-2 border-dashed border-white/50 bg-gradient-to-b from-[#383838] to-[#767676] hover:border-white"
                      for="uploadCover"
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/sound-ebc19.appspot.com/o/covers%2FqEVcwq1gQhgKK21zz2v0rfjKnnp1%2F51421d7d-a2df-44e4-90fa-94ee5dd8c9f0?alt=media&amp;token=28df2fa5-d39d-44fd-bfc2-4cb76f4a6eb9"
                        alt=""
                        class="h-full w-full object-cover"
                      >
                      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                        <Icon
                          name="Camera"
                          :size="36"
                        />
                      </div>
                    </label>
                    <input id="uploadCover" type="file" class="hidden">
                    <h3 class="relative mt-5 text-center font-bold text-white lg:text-xl">
                      上傳歌曲封面 <br>
                      <span class="text-sm text-white/50">
                        支援檔案類型：JPG、PNG。≤1MB
                      </span>
                    </h3>
                  </div>
                  <div class="mt-7.5">
                    <label class="font-bold text-white lg:text-lg">
                      歌曲名稱
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        class="mt-2 block h-15 w-full rounded-full border-[3px] border-transparent bg-[#030303] px-6 text-white outline-none focus:border-[#696969]"
                      >
                    </div>
                  </div>
                  <div class="mt-5">
                    <label class="font-bold text-white lg:text-lg">
                      曲風
                    </label>
                    <div class="relative">
                      <select
                        class="mt-2 block h-15 w-full appearance-none rounded-full border-[3px] border-transparent bg-[#030303] px-6 text-white outline-none focus:border-[#696969]"
                        name="genre"
                      >
                        <option value="無">
                          無
                        </option>
                        <option value="流行">
                          流行
                        </option>
                        <option value="搖滾">
                          搖滾
                        </option>
                        <option value="饒舌">
                          饒舌
                        </option>
                        <option value="古典">
                          古典
                        </option>
                        <option value="藍調">
                          藍調
                        </option>
                        <option value="爵士">
                          爵士
                        </option>
                        <option value="鄉村">
                          鄉村
                        </option>
                      </select>
                      <div class="absolute right-6 top-1/2 -translate-y-1/2 text-white">
                        <Icon
                          name="SelectArrow"
                          :size="16"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-5">
                    <label class="font-bold text-white lg:text-lg">
                      描述
                    </label>
                    <textarea
                      class="mt-2 block h-35 w-full resize-none rounded-[30px] border-[3px] border-transparent bg-[#030303] px-6 py-4 leading-[1.75] text-white outline-none placeholder:text-[#696969] focus:border-[#696969]"
                      type="text"
                    />
                  </div>
                  <div class="mt-5">
                    <label class="font-bold text-white lg:text-lg">
                      附加標籤
                    </label>
                    <div class="mt-2 flex min-h-[60px] cursor-text flex-wrap gap-2 rounded-[30px] border-[3px] border-transparent bg-[#030303] px-6 py-3 focus:border-[#696969]">
                      <div
                        class="flex h-7.5 cursor-pointer items-center gap-x-1 rounded-full bg-[#383838] px-2.5 text-sm text-white hover:line-through"
                      >
                        <span class="opacity-50">
                          #
                        </span>
                        <span>
                          陳約翰
                        </span>
                      </div>
                      <input
                        type="text"
                        class="w-30 bg-transparent text-white outline-none"
                      >
                    </div>
                  </div>
                  <div
                    class="relative mx-auto mt-5 flex h-15 w-50 overflow-hidden rounded-full border-[3px] border-[#030303] bg-[#212121]"
                  >
                    <button
                      type="submit"
                      class="flex h-full w-1/2 items-center justify-center text-white hover:bg-[#383838]"
                    >
                      <span>確定</span>
                    </button>
                    <button
                      type="button"
                      class="flex h-full w-1/2 items-center justify-center text-white hover:bg-[#383838]"
                    >
                      取消
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>