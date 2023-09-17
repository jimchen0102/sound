// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    'nuxt-vuefire',
    '@nuxtjs/tailwindcss'
  ],
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: 'AIzaSyDXqTV6UjZd4lWZiWFq8ihK_gm6j-4uE8A',
      authDomain: 'sound-ebc19.firebaseapp.com',
      projectId: 'sound-ebc19',
      storageBucket: 'sound-ebc19.appspot.com',
      messagingSenderId: '291203938606',
      appId: '1:291203938606:web:c402f52640f870a11e22bf'
    }
  }
})
