import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { isOpenChatModal } from '../Atoms/chatModal.atom'

const useChatModal = () => {
	const [chatModalOpen, setChatModalOpen] = useRecoilState(isOpenChatModal)

	const openChat = useCallback(() => {
		setChatModalOpen(true)
	}, [])

	const closeChat = useCallback(() => {
		setChatModalOpen(false)
	}, [])

	return { chatModalOpen, openChat, closeChat }
}

export default useChatModal
