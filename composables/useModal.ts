export const useModal = (type: string) => {
  const isModalOpen = useState(`${type}IsModalOpen`, () => false)

  watch(isModalOpen, (newVal) => {
    if (newVal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  })

  return {
    isModalOpen
  }
}
