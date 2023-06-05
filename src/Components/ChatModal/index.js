import styled from 'styled-components'
import useChatModal from '../../Hooks/useChatModal'
import { useEffect, useState } from 'react'
import { ModalClose_icon } from '../Icons/Icons'
import { WidthAutoCSS } from '../../Styles/common'
import ChatList from './Components/List'
import { useRecoilState } from 'recoil'
import { myChatRoomList } from '../../Atoms/myChatRoomList.atom'
import { useSocket } from '../../Context/socket'
import ChatView from './Components/View'

function ChatModal({ isDetailPage }) {
	// 소켓 불러오기
	const socket = useSocket()
	// 모달 HOOKS
	const { chatModalOpen, closeChat } = useChatModal()
	// 채팅방 리스트 관리 recoil
	const [roomList, setRoomList] = useRecoilState(myChatRoomList)
	// 동일한 상품idx를 가진 채팅방끼리 묶어주기
	const groupedChats = roomList.chats?.reduce((groups, chats) => {
		const { product } = chats
		const { idx } = product
		if (!groups[idx]) {
			groups[idx] = []
		}
		groups[idx].push(chats)
		return groups
	}, {})
	// 동일한 상품idx로 묶어진 객체들을 배열화
	const prdChatsList = Object.values(groupedChats)

	// 선택한 채팅방 채팅창 띄우기 STATE
	const [viewChatState, setViewChatState] = useState(false)
	// 선택한 상품의 prod_idx를 받아와서 PROPS로 뿌려준 뒤 socket.emit('join',{ viewChatIdx })
	const [viewChatIdx, setViewChatIdx] = useState(null)

	// 판매자 시점 - 판매자가 등록한 물품리스트 중 물품의 채팅리스트
	const onClickChatRoom = prod_idx => {
		setViewChatIdx(prod_idx)
		setViewChatState(true)
		// socket.emit('join', { room_idx })
	}

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
							setViewChatState(false)
							closeChat()
						}}
					/>
				</S.ChatHeader>
				<S.ChatBody>
					{prdChatsList &&
						!viewChatState &&
						prdChatsList?.map((item, idx) => {
							return (
								<ChatList
									key={idx}
									list={item}
									onClickChatRoom={onClickChatRoom}
								/>
							)
						})}
					{viewChatState && (
						<ChatView prod_idx={viewChatIdx} room_state={viewChatState} />
					)}
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
	height: 85%;
	overflow-y: scroll;
	z-index: 100;
	::-webkit-scrollbar {
		display: none;
	}
`
const S = {
	Wrapper,
	ChatContainer,
	ChatHeader,
	ChatBody,
}
