<script setup lang="ts">
import { signOut } from 'firebase/auth'
import { vOnClickOutside } from '@vueuse/components'
import { IconCloudUpload, IconPlaylist, IconLogin2, IconUser } from '@tabler/icons-vue'

const auth = useFirebaseAuth()
const user = useCurrentUser()
const route = useRoute()
const { isModalOpen } = useModal('auth')
const isPopupOpen = ref(false)
const requireAuth = ['upload', 'manage']

const handleSignOut = async () => {
  await signOut(auth!)
  isPopupOpen.value = false
  if (requireAuth.includes(route.name as string)) await navigateTo('/')
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
    <nav class="pointer-events-auto">
      <div
        v-if="user"
        v-on-click-outside="() => isPopupOpen = false"
        class="relative"
      >
        <button
          type="button"
          class="block h-10 w-10 overflow-hidden rounded-full"
          @click="isPopupOpen = !isPopupOpen"
        >
          <img
            src="@/assets/img/user-photo.svg"
            class="h-full w-full object-cover"
          >
        </button>
        <div
          v-show="isPopupOpen"
          class="absolute right-0 top-[calc(100%+8px)] w-60 rounded border-2 border-white/10 bg-[#212121] text-white"
        >
          <div class="flex items-center gap-x-4 p-4">
            <div class="block h-10 w-10 overflow-hidden rounded-full">
              <img
                src="@/assets/img/user-photo.svg"
                class="w-10 rounded-full"
              >
            </div>
            <div class="min-w-0">
              <h3 class="line-clamp-1">
                {{ user.displayName }}
              </h3>
              <h4 class="line-clamp-1 text-sm">
                {{ user.email }}
              </h4>
            </div>
          </div>
          <ul class="border-t-2 border-white/10 py-4">
            <li>
              <NuxtLink
                to="/upload"
                class="flex items-center gap-x-4 px-4 py-2 text-sm hover:bg-white/5"
                @click="isPopupOpen = false"
              >
                <IconCloudUpload :stroke-width="1" />
                上傳歌曲
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/manage"
                class="flex items-center gap-x-4 px-4 py-2 text-sm hover:bg-white/5"
                @click="isPopupOpen = false"
              >
                <IconPlaylist :stroke-width="1" />
                我的歌曲
              </NuxtLink>
            </li>
            <li>
              <button
                type="button"
                class="flex w-full items-center gap-x-4 px-4 py-2 text-sm hover:bg-white/5"
                @click="handleSignOut"
              >
                <IconLogin2 :stroke-width="1" />
                登出
              </button>
            </li>
          </ul>
        </div>
      </div>
      <button
        v-else
        type="button"
        class="group pointer-events-auto flex h-12 items-center gap-x-2 rounded-full bg-primary pl-2 pr-4 hover:bg-gradient-to-b hover:from-primary hover:to-secondary lg:h-15 lg:pl-2.5 lg:pr-6"
        @click="isModalOpen = true"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#030303] text-white lg:h-10 lg:w-10">
          <IconUser :size="20" />
        </div>
        <span class="text-sm font-bold lg:text-base">
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
