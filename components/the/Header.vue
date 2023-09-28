<script setup lang="ts">
import { signOut, Auth } from 'firebase/auth'

const auth = useFirebaseAuth()
const user = useCurrentUser()
const route = useRoute()
const { isModalOpen } = useModal('auth')

const handleSignOut = async () => {
  await signOut(auth as Auth)
  if (route.name === 'manage') await navigateTo('/')
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
      <ul
        v-if="user"
        class="flex items-center gap-x-2.5 lg:gap-x-5"
      >
        <li>
          <NuxtLink
            to="/upload"
            class="group flex h-15 items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6 hover:bg-gradient-to-br hover:from-primary hover:to-secondary"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
              <Icon name="Wave" />
            </div>
            <span class="font-bold text-white group-hover:text-black">
              上傳歌曲
            </span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/manage"
            class="group flex h-15 items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6 hover:bg-gradient-to-br hover:from-primary hover:to-secondary"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
              <Icon name="Wave" />
            </div>
            <span class="font-bold text-white group-hover:text-black">
              我的歌曲
            </span>
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            class="flex h-15 w-15 items-center justify-center rounded-full bg-[#030303] text-white hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-black"
            @click="handleSignOut"
          >
            <Icon name="Logout" />
          </button>
        </li>
      </ul>
      <button
        v-else
        type="button"
        class="group flex h-15 items-center gap-x-2.5 rounded-full bg-[#030303] pl-2.5 pr-6 hover:bg-gradient-to-br hover:from-primary hover:to-secondary"
        @click="isModalOpen = true"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#212121] text-white">
          <Icon
            name="User"
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
