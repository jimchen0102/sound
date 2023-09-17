<script setup lang="ts">
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const auth = useFirebaseAuth()
const user = useCurrentUser()
</script>

<template>
  <NuxtLink to="/">
    home
  </NuxtLink>
  <NuxtLink to="/song/1123">
    song
  </NuxtLink>
  <NuxtLink to="/manage">
    manage
  </NuxtLink>
  <br>
  <div class="flex">
    <button @click="signInWithEmailAndPassword(auth!, 'aa@aa.aa', 'aaaaaa')">
      登入
    </button>
    <button @click="signOut(auth!)">
      登出
    </button>
  </div>
  {{ user?.displayName }}
  <slot />
</template>
