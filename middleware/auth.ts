export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()

  if (!user) {
    return navigateTo({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
