import styled from 'styled-components'
import Input from '../../../../../Input/Input'
import Button from '../../../../../Button/Button'
import { useState } from 'react'
import ChatApi from '../../../../../../Apis/chatApi'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { myChatRoomList } from '../../../../../../Atoms/myChatRoomList.atom'
import { userInfoAtom } from '../../../../../../Atoms/userInfo.atom'
import { useSocket } from '../../../../../../Context/socket'
import { useRef } from 'react'
import BuyMessagesBox from './MessagesBox/MessagesBox'

function BuyChatBox({ room_idx }) {
	//소켓
	const socket = useSocket()

	// recoil 불러오기
	const [myChatRoom, setMyChatRoom] = useRecoilState(myChatRoomList)
	const [myInfo, setMyInfo] = useRecoilState(userInfoAtom)

	// 채팅방 리스트를 받아오고 room_idx와 동일한 채팅방 내역 불러오기
	const chatInfo = myChatRoom.chats.find(item => item.idx === room_idx)

	// 채팅방 내역
	const [allMessages, setAllMessages] = useState([])

	// 인풋창(보낼 채팅 입력)
	const messagesInput = useRef('')
	const [sendMessages, setSendMessages] = useState('')
	const onMessageSet = () => {
		setSendMessages(messagesInput.current.value)
	}

	// UTC 날짜를 한국 날짜로
	const options = {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	const utcDate = new Date()
	const koreanDate = utcDate.toLocaleString('ko-KR', options)
	const scrollRef = useRef(null)

	// 채팅창 스크롤
	useEffect(() => {
		// if (scrollRef.current) {
		// 	const scrollContainer = scrollRef.current
		// 	scrollContainer.scrollTop = scrollContainer.scrollHeight
		// }
		return scrollRef.current.scrollIntoView({
			block: 'end',
			inline: 'nearest',
		})
	}, [allMessages])

	// 채팅방 리스트 최신화
	const newChatRoomList = async () => {
		try {
			const res = await ChatApi.chatRoomList()
			setMyChatRoom(res.data)
		} catch (err) {}
	}

	//특정 채팅방 내역 불러오기
	const getChatMsg = async () => {
		try {
			const res = await ChatApi.checkChatLog(room_idx)
			setAllMessages(res.data)
		} catch (error) {}
	}

	// 채팅방에 따른 메시지 내역 불러오기
	useEffect(() => {
		getChatMsg()
		newChatRoomList()
	}, [room_idx, sendMessages])

	// 채팅 수신
	useEffect(() => {
		socket?.emit('join', { room_idx })
		socket?.on('receiveMessage', async data => {
			try {
				const res = await ChatApi.checkChatLog(data.room_idx)
				setAllMessages(res.data)
				newChatRoomList()
			} catch (error) {
				alert(error)
			}
		})

		return () => {
			socket?.emit('leave', { room_idx })
		}
	}, [])

	// 채팅 전송
	const postMessage = async e => {
		e.preventDefault()
		newChatRoomList()

		const data = {
			title: chatInfo.product.title,
			createdAt: chatInfo.product.createdAt,
			prod_idx: chatInfo.product.idx,
			room_idx: room_idx,
			nicKname: myInfo.nicKname,
			message: messagesInput.current.value,
			isSeller: chatInfo.isSeller,
		}

		socket.emit('sendMessage', data)

		try {
			const res = await ChatApi.sendMsg({
				room_idx: data.room_idx,
				message: data.message,
			})
		} catch (error) {
			alert(error)
		}

		try {
			const res = await ChatApi.checkChatLog(data.room_idx)
			setAllMessages(res.data)
		} catch (error) {
			alert(error)
		}

		messagesInput.current.value = ''
	}

	const pressEnter = e => {
		if (e.nativeEvent.isComposing) return

		if (e.key === 'Enter' && e.shiftKey) {
			return
		} else if (e.key === 'Enter') {
			postMessage(e)
		}
	}

	return (
		<S.ChatContainer>
			<S.ChatDate>
				<span>{koreanDate}</span>

				{/* 오늘 날짜로 */}
			</S.ChatDate>
			<S.ChatOption></S.ChatOption>
			<S.ChatMsg>
				{allMessages?.map((item, idx) => {
					return <BuyMessagesBox key={idx} allMessages={item} myInfo={myInfo} />
				})}
				<div ref={scrollRef}></div>
			</S.ChatMsg>
			<S.ChatSend onKeyDown={pressEnter}>
				<S.StyledInput
					placeholder="메시지를 입력해주세요"
					ref={messagesInput}
				/>
				<S.StyledButton onClick={pressEnter}>전송</S.StyledButton>
			</S.ChatSend>
		</S.ChatContainer>
	)
}

export default BuyChatBox

const ChatContainer = styled.div`
	width: 70%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	box-shadow: 1px 1px 1px gray;
	border-radius: 1rem;

	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`
const ChatDate = styled.div`
	margin-top: 2rem;
	text-align: center;
	& > span {
		border-radius: 1rem;
		z-index: 9999;
		padding: 0.5rem;
		background-color: ${({ theme }) => theme.COLOR.common.white};
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`
const ChatOption = styled.div`
	position: absolute;
	display: flex;
	top: 0;

	justify-content: flex-end;
	padding: 0 1rem;
	margin-top: 2rem;
	width: 100%;
	height: auto;
	& > span {
		:hover {
			cursor: pointer;
			color: ${({ theme }) => theme.COLOR.main};
		}
	}
`
const ChatMsg = styled.div`
	margin-top: 1rem;
	height: 90%;
	overflow-y: scroll;
	& > h1 {
		text-align: center;
	}
	::-webkit-scrollbar {
		display: none;
	}
`
const ChatSend = styled.div`
	display: flex;
	height: 10%;
	border-top: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	padding: 0 0.3rem;
`
const StyledButton = styled(Button)`
	background: ${({ theme }) => theme.COLOR.main};
	border-radius: 0rem;
	width: 20%;
`
const StyledInput = styled(Input)`
	width: 80%;
	border: none;
	background: ${({ theme }) => theme.COLOR.common.white};
`
const S = {
	ChatContainer,
	ChatDate,
	ChatMsg,
	ChatSend,
	ChatOption,
	StyledButton,
	StyledInput,
}
