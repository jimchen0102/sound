<script setup lang="ts">
import { signOut, Auth } from 'firebase/auth'
import { vOnClickOutside } from '@vueuse/components'

const auth = useFirebaseAuth()
const user = useCurrentUser()
const route = useRoute()
const { isModalOpen } = useModal('auth')
const isUserModalOpen = ref(false)

const handleSignOut = async () => {
  await signOut(auth as Auth)
  isUserModalOpen.value = false
  if (route.name === 'upload' || route.name === 'manage') await navigateTo('/')
}
</script>

<template>
  <header class="pointer-events-none fixed left-0 top-0 z-[999] flex h-25 w-full items-center justify-between px-5 lg:h-35 lg:px-10 xl:px-20">
    <NuxtLink
      to="/"
      class="pointer-events-auto"
    >
      <img
        src="@/assets/img/sound-logo.svg"
        alt="SOUND"
        class="w-20 lg:w-auto"
      >
    </NuxtLink>
    <nav class="pointer-events-auto relative">
      <div
        v-if="user"
        v-on-click-outside="() => isUserModalOpen = false"
        class="relative"
      >
        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10 bg-[#030303] text-white"
          @click="isUserModalOpen = !isUserModalOpen"
        >
          <Icon
            name="IconUser"
            :size="20"
          />
        </button>
        <ul
          v-show="isUserModalOpen"
          class="absolute right-0 top-[calc(100%+8px)] w-48 rounded border-2 border-white/10 bg-[#212121] py-4 text-white"
        >
          <li>
            <NuxtLink
              to="/upload"
              class="flex items-center gap-x-4 px-6 py-2 text-sm hover:bg-white/5"
              @click="isUserModalOpen = false"
            >
              <Icon
                name="IconCloudUpload"
                :stroke-width="1"
              />
              上傳歌曲
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/manage"
              class="flex items-center gap-x-4 px-6 py-2 text-sm hover:bg-white/5"
              @click="isUserModalOpen = false"
            >
              <Icon
                name="IconSettings"
                :stroke-width="1"
              />
              管理歌曲
            </NuxtLink>
          </li>
          <li>
            <button
              type="button"
              class="flex w-full items-center gap-x-4 px-6 py-2 text-sm hover:bg-white/5"
              @click="handleSignOut"
            >
              <Icon
                name="IconLogin2"
                :stroke-width="1"
              />
              登出
            </button>
          </li>
        </ul>
      </div>
      <button
        v-else
        type="button"
        class="group pointer-events-auto flex h-15 items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6 hover:bg-gradient-to-br hover:from-primary hover:to-secondary"
        @click="isModalOpen = true"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
          <Icon
            name="IconUser"
            :size="20"
          />
        </div>
        <span class="font-bold text-white group-hover:text-black">
          登入 / 註冊
        </span>
      </button>
    </nav>
  </header>

  <Teleport to="body">
    <Transition name="fade">
      <AuthModal v-if="isModalOpen" />
    </Transition>
  </Teleport>
</template>
