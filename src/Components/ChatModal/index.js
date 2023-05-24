import styled from 'styled-components'
import useChatModal from '../../Hooks/useChatModal'
import { useEffect } from 'react'
import { ModalClose_icon } from '../Icons/Icons'
import { WidthAutoCSS } from '../../Styles/common'
import ChatList from './Components/List'
import { useRecoilState } from 'recoil'
import { userInfoAtom } from '../../Atoms/userInfo.atom'

function ChatModal() {
	const { chatModalOpen, closeChat } = useChatModal()
	const userInfo = useRecoilState(userInfoAtom)

	const preventScroll = () => {
		const currentScrollY = window.scrollY
		document.body.style.position = 'fixed'
		document.body.style.width = '100%'
		document.body.style.top = `-${currentScrollY}px` // 현재 스크롤 위치
		document.body.style.overflowY = 'scroll'
		return currentScrollY
	}
	const allowScroll = prevScrollY => {
		document.body.style.position = ''
		document.body.style.width = ''
		document.body.style.top = ''
		document.body.style.overflowY = ''
		window.scrollTo(0, prevScrollY)
	}
	useEffect(() => {
		const prevScrollY = preventScroll()
		return () => {
			allowScroll(prevScrollY)
		}
	}, [])
	return (
		<S.Wrapper modal={chatModalOpen}>
			<S.ChatContainer>
				<S.ChatHeader>
					<h3>NEGO MESSENGER</h3>
					<ModalClose_icon
						size={15}
						onClick={() => {
							closeChat()
							socket.on('disconnect', () => {
								console.log('유저가 나감', socket.id)
							})
						}}
					/>
				</S.ChatHeader>
				<S.ChatBody>
					<ChatList />
				</S.ChatBody>
			</S.ChatContainer>
		</S.Wrapper>
	)
}

export default ChatModal

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	overflow: ${({ modal }) => (modal ? 'hidden' : 'unset')};
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
`

const ChatContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 50%;
	right: 0;
	margin: auto;
	width: 80rem;
	height: 60rem;
	z-index: 9999;
	background-color: rgb(255, 255, 255);
	border-radius: 10px;
	box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

	transform: translateX(-50%);
`
const ChatHeader = styled.div`
	position: relative;
	padding: 1rem 0;
	border-bottom: 0.05rem solid gray;
	& > h3 {
		text-align: center;
	}
	& > svg {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(-50%, -50%);
		cursor: pointer;
	}
`
const ChatBody = styled.div`
	${WidthAutoCSS}
	margin-top: 1rem;
`
const S = {
	Wrapper,
	ChatContainer,
	ChatHeader,
	ChatBody,
}
