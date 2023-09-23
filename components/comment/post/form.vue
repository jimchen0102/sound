<script setup lang="ts">
const user = useCurrentUser()
</script>

<template>
  <form>
    <fieldset>
      <textarea
        class="block h-40 w-full resize-none rounded-[30px] border-[3px] border-transparent bg-[#212121] px-7.5 py-5 leading-[1.75] text-white outline-none placeholder:text-white/70 focus:border-[#696969] disabled:cursor-not-allowed"
        :placeholder="`${user ? '發表你對這首歌的感受吧!' : '登入會員才能發表評論'}`"
        :disabled="!user"
      />
      <button
        type="button"
        class="relative mx-auto -mt-7.5 block h-15 w-40 rounded-full border-[3px] border-[#030303] bg-[#212121] text-white hover:bg-[#383838]"
      >
        登入 / 註冊
      </button>
    </fieldset>
  </form>
</template>
