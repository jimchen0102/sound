import Toast, { useToast, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_CENTER
  })

  const toast = useToast()

  return {
    provide: {
      toast
    }
  }
})
