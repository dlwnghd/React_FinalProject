import styled from 'styled-components'
import useChatModal from '../../Hooks/useChatModal'
import { useEffect, useState } from 'react'
import { ModalClose_icon } from '../Icons/Icons'
import { WidthAutoCSS } from '../../Styles/common'
import { useRecoilState } from 'recoil'
import { myChatRoomList } from '../../Atoms/myChatRoomList.atom'
import { useSocket } from '../../Context/socket'
import { userInfoAtom } from '../../Atoms/userInfo.atom'
import SellerChat from './Components/Seller'
import BuyerChat from './Components/Buyer'

function ChatModal({ isDetailPage }) {
	// 소켓 불러오기
	const socket = useSocket()
	// 모달 HOOKS
	const { chatModalOpen, closeChat } = useChatModal()
	const [isSeller, setIsSeller] = useState(false)
	// 채팅방 리스트 관리 recoil
	const [roomList, setRoomList] = useRecoilState(myChatRoomList)
	const [myInfo, setMyInfo] = useRecoilState(userInfoAtom)
	const [form, setForm] = useState('구매')

	const onChangeForm = e => {
		setForm(e.target.innerText)
		console.log(e.target.innerText)
	}
	useEffect(() => {}, [form])
	// 판매자(내가 판매하고 있는것)
	// 구매자(내가 구매하고자 하는것)
	const seller = roomList.chats?.filter(
		item => item.product.User.token == myInfo.token,
	)
	const buyer = roomList.chats?.filter(
		item => item.product.User.token !== myInfo.token,
	)
	// 동일한 상품idx를 가진 채팅방끼리 묶어주기(판매자)
	const groupedChats = seller?.reduce((groups, chats) => {
		const { product } = chats
		const { idx } = product
		if (!groups[idx]) {
			groups[idx] = []
		}
		groups[idx].push(chats)
		return groups
	}, {})
	// 동일한 상품idx로 묶어진 객체들을 배열화(판매자)
	const sellPrdChatsList = Object.values(groupedChats)

	// 선택한 채팅방 채팅창 띄우기 STATE
	const [viewChatState, setViewChatState] = useState(false)
	// 선택한 상품의 prod_idx를 받아와서 PROPS로 뿌려준 뒤 socket.emit('join',{ viewChatIdx })
	const [viewChatIdx, setViewChatIdx] = useState(null)

	// 판매자 시점 - 판매자가 등록한 물품리스트 중 물품의 채팅리스트
	const onClickChatRoom = prod_idx => {
		setViewChatIdx(prod_idx)
		setViewChatState(true)
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
					<S.ChatCategory>
						<S.SellBtn state={form} onClick={onChangeForm}>
							판매
						</S.SellBtn>
						<S.BuyBtn state={form} onClick={onChangeForm}>
							구매
						</S.BuyBtn>
					</S.ChatCategory>
				</S.ChatHeader>

				<S.ChatBody>
					{form === '판매' ? (
						<SellerChat list={sellPrdChatsList} />
					) : (
						<BuyerChat list={buyer} />
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
	padding-top: 1rem;
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
const ChatCategory = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
`
const SellBtn = styled.button`
	width: 50%;
	background-color: ${({ theme, state }) =>
		state === '판매' ? theme.COLOR.common.black : theme.COLOR.common.white};
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	color: ${({ theme }) => theme.COLOR.main};

	:hover {
		background-color: ${({ theme }) => theme.COLOR.common.black};
	}
`
const BuyBtn = styled.button`
	width: 50%;
	background-color: ${({ theme, state }) =>
		state === '구매' ? theme.COLOR.common.black : theme.COLOR.common.white};
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	color: ${({ theme }) => theme.COLOR.main};

	:hover {
		background-color: ${({ theme }) => theme.COLOR.common.black};
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
	ChatCategory,
	ChatBody,
	SellBtn,
	BuyBtn,
}
