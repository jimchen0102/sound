export function useAuthModal () {
  const modalType = useState('modalType', () => 'login')
  const isModalOpen = useState('isModalOpen', () => false)

  return {
    modalType,
    isModalOpen
  }
}
