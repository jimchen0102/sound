<script setup lang="ts">
import { AuthType } from '@/types'

const { isModalOpen } = useModal('auth')
const authType = ref<AuthType>(AuthType.LOGIN)
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
              <div class="flex justify-center divide-x divide-white">
                <div class="px-5 lg:px-7.5">
                  <button
                    type="button"
                    class="text-2xl font-bold lg:text-3xl"
                    :class="
                      authType === AuthType.LOGIN
                        ? 'text-white'
                        : 'text-[#696969]'
                    "
                    @click="authType = AuthType.LOGIN"
                  >
                    登入
                  </button>
                </div>
                <div class="px-5 lg:px-7.5">
                  <button
                    type="button"
                    class="text-2xl font-bold lg:text-3xl"
                    :class="
                      authType === AuthType.REGISTER
                        ? 'text-white'
                        : 'text-[#696969]'
                    "
                    @click="authType = AuthType.REGISTER"
                  >
                    註冊
                  </button>
                </div>
              </div>
            </div>
            <div class="rounded-[40px] bg-[#212121] px-5 py-7.5 lg:rounded-[60px] lg:p-10">
              <AuthLoginForm
                v-if="authType === AuthType.LOGIN"
                @change-auth-type="(type) => authType = type"
              />
              <AuthRegisterForm
                v-if="authType === AuthType.REGISTER"
                @change-auth-type="(type) => authType = type"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
