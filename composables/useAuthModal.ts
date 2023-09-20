type ModalType = 'login' | 'register'

export function useAuthModal () {
  const modalType = useState<ModalType>('modalType', () => 'login')
  const isModalOpen = useState('isModalOpen', () => false)

  return {
    modalType,
    isModalOpen
  }
}
