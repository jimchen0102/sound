<script setup lang="ts">
const user = useCurrentUser()

const { isModalOpen } = useModal('auth')
</script>

<template>
  <form>
    <textarea
      class="block h-40 w-full resize-none rounded-[30px] border-[3px] border-transparent bg-[#212121] px-7.5 py-5 leading-[1.75] text-white outline-none placeholder:text-white/70 focus:border-[#696969] disabled:cursor-not-allowed"
      :placeholder="`${user ? '發表你對這首歌的感受吧!' : '登入會員才能發表評論'}`"
      :disabled="!user"
    />
    <div
      v-if="user"
      class="relative mx-auto -mt-7.5 flex h-15 w-50 overflow-hidden rounded-full border-[3px] border-[#030303] bg-[#212121]"
    >
      <button
        type="submit"
        class="flex w-1/2 items-center justify-center text-white hover:bg-[#383838]"
      >
        留言
      </button>
      <span class="absolute left-1/2 top-1/2 h-7.5 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-[#030303]" />
      <button
        type="reset"
        class="flex w-1/2 items-center justify-center text-white hover:bg-[#383838]"
      >
        取消
      </button>
    </div>
    <button
      v-else
      type="button"
      class="relative mx-auto -mt-7.5 block h-15 w-40 rounded-full border-[3px] border-[#030303] bg-[#212121] text-white hover:bg-[#383838]"
      @click="isModalOpen = true"
    >
      登入 / 註冊
    </button>
  </form>
</template>
