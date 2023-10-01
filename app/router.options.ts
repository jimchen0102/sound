import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior: (_to, _from, savedPosition) => {
    const nuxtApp = useNuxtApp()
    const position = savedPosition || { left: 0, top: 0 }
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:transition:finish', async () => {
        await nextTick()
        resolve(position)
      })
    })
  }
}
