type ModalType = 'login' | 'register'

export function useModal (type: string) {
  const modalType = useState<ModalType>('modalType', () => 'login')
  const isModalOpen = useState(`${type}IsModalOpen`, () => false)

  return {
    modalType,
    isModalOpen
  }
}
