import styled from 'styled-components'

import { useSocket } from '../../../Context/socket'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'
import { useRecoilState } from 'recoil'
import { myChatRoomList } from '../../../Atoms/myChatRoomList.atom'
import { userInfoAtom } from '../../../Atoms/userInfo.atom'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import MMessagesBox from './MessagesBox/MessagesBox'
import ChatApi from '../../../Apis/chatApi'

function MChatBox({ roomIdx, setViewChatState }) {
	// UTC 날짜를 한국 날짜로
	const socket = useSocket()
	const [myChatRoom, setMyChatRoom] = useRecoilState(myChatRoomList)
	const [myInfo, setMyInfo] = useRecoilState(userInfoAtom)

	//채팅방 리스트를 받아오고 room_idx와 동일한 채팅방 내역 불러오기
	const chatInfo = myChatRoom.chats.find(item => item.idx === roomIdx)
	const [allMessages, setAllMessages] = useState([])

	const messagesInput = useRef('')
	const [sendMessages, setSendMessages] = useState('')

	const onMessageSet = () => {
		setSendMessages(messagesInput.current.value)
	}
	const [receivedMessages, setReceivedMessages] = useState([])

	const options = {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	const utcDate = new Date()
	const koreanDate = utcDate.toLocaleString('ko-KR', options)

	const scrollRef = useRef(null)

	useEffect(() => {
		if (scrollRef.current) {
			const scrollContainer = scrollRef.current
			scrollContainer.scrollTop = scrollContainer.scrollHeight
		}
	})

	const newChatRoomList = async () => {
		// 채팅방 리스트 최신화
		try {
			const res = await ChatApi.chatRoomList()
			setMyChatRoom(res.data)
		} catch (err) {}
	}

	const getChatMsg = async () => {
		//특정 채팅방 내역 불러오기
		try {
			const res = await ChatApi.checkChatLog(roomIdx)
			setAllMessages(res.data)
		} catch (error) {}
	}

	const postMessage = async e => {
		const data = {
			title: chatInfo.product.title,
			createdAt:
				new Date(Date.now()).getHours() +
				':' +
				new Date(Date.now()).getMinutes(),

			prod_idx: chatInfo.product.idx,
			roomIdx: roomIdx,
			nicKname: myInfo.nicKname,

			message: messagesInput.current.value,

			isSeller: chatInfo.isSeller,
		}
		if (messagesInput.current.value !== '') {
			onMessageSet()
			socket.emit('sendMessage', data)
			try {
				const res = await ChatApi.sendMsg(roomIdx, messagesInput.current.value)

				if (res.status) {
					messagesInput.current.value = ''
					setSendMessages('')
					newChatRoomList()
				}
			} catch (error) {}

			return
		}
		if (messagesInput.current.value === '') {
			alert('메세지를 입력해주세요')
			return
		}
	}

	useEffect(() => {
		// 채팅방에 따른 메시지 내역 불러오기
		getChatMsg()
	}, [roomIdx, sendMessages])

	useEffect(() => {
		// 메세지 수신
		socket.on('receiveMessage', data => {
			setReceivedMessages(list => [...list, data])
		})
	}, [socket])

	return (
		<S.ChatContainer>
			<S.ChatInfo chatInfo={chatInfo}>
				<p>{chatInfo.User.nick_name}</p>
				<div>
					<img />
					<div>
						<p>{chatInfo.product.title}</p>
						<p>
							{chatInfo.product.price
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							원
						</p>
					</div>
				</div>
			</S.ChatInfo>
			<S.ChatDate>
				<span>{koreanDate}</span>

				{/* 오늘 날짜로 */}
			</S.ChatDate>
			<S.ChatOption>
				<span
					onClick={() => {
						setViewChatState(false)
					}}
				>
					이전으로
				</span>
			</S.ChatOption>
			<S.ChatMsg ref={scrollRef}>
				{allMessages?.map((item, idx) => {
					return <MMessagesBox key={idx} allMessages={item} myInfo={myInfo} />
				})}
			</S.ChatMsg>
			<S.ChatSend>
				<S.StyledInput
					placeholder="메시지를 입력해주세요"
					ref={messagesInput}

					// value={sendMessages}
					// onChange={e => {
					// 	setSendMessages(e.target.value)
					// }}
				/>
				<S.StyledButton onClick={postMessage}>전송</S.StyledButton>
			</S.ChatSend>
		</S.ChatContainer>
	)
}

export default MChatBox

const ChatContainer = styled.div`
	width: 100%;
	height: 50rem;
	position: relative;
	display: flex;
	flex-direction: column;
	box-shadow: 1px 1px 1px gray;
	border-radius: 1rem;

	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`
const ChatInfo = styled.div`
	margin-top: 1rem;
	padding-bottom: 1rem;
	display: flex;
	gap: 2rem;
	border-bottom: 0.5px solid gray;
	flex-direction: column;
	& > p:first-child {
		text-align: center;
	}
	& > div {
		display: flex;
		gap: 1rem;

		& > div {
			display: flex;
			flex-direction: column;
		}
	}
	& > div > img {
		width: 5rem;
		height: 5rem;
		background: ${({ chatInfo }) => `url(${chatInfo.product.img_url})`}
			no-repeat center center;
		background-size: cover;
	}
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

	justify-content: space-between;
	padding: 0 1rem;
	margin-top: 1rem;
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
	width: 100%;
	display: flex;
	height: 10%;
	border-top: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
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
	ChatInfo,
}
