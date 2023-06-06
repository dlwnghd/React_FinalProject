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
import SellMessagesBox from './MessagesBox.js/MessagesBox'

function SellChatBox({ roomIdx, setViewChatState }) {
	// UTC 날짜를 한국 날짜로
	const socket = useSocket()
	const [myChatRoom, setMyChatRoom] = useRecoilState(myChatRoomList)
	const [myInfo, setMyInfo] = useRecoilState(userInfoAtom)

	const [chatState, setChatState] = useState(true)

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
		} catch (err) {
			console.log('에러발생', err)
		}
	}

	const getChatMsg = async () => {
		//특정 채팅방 내역 불러오기
		try {
			const res = await ChatApi.checkChatLog(roomIdx)
			setAllMessages(res.data)
		} catch (error) {
			console.log(error)
		}
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
		if (messagesInput.current.value !== '' && e.keyCode === 13) {
			onMessageSet()
			socket.emit('sendMessage', data)
			try {
				const res = await ChatApi.sendMsg(roomIdx, messagesInput.current.value)

				if (res.status) {
					messagesInput.current.value = ''
					setSendMessages('')
					newChatRoomList()
				}
			} catch (error) {
				console.log('전송실패')
			}

			return
		}
		if (messagesInput.current.value === '' && e.keyCode === 13) {
			alert('메세지를 입력해주세요')
			return
		}
	}

	const onDisableChat = () => {
		setChatState(false)
	}
	const exitChatRoom = () => {
		if (window.confirm('정말 채팅방 나갈꺼에요?')) {
			socket.emit('leave', { roomIdx })
			onDisableChat()
			// const lestChat = myChatRoom.chats.filter(item => item !== chatInfo)
			// setMyChatRoom(lestChat)
			// setAllMessages([])
		} else {
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
		<S.ChatContainer chatState={chatState}>
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
				<span onClick={exitChatRoom}>채팅방 나가기</span>
			</S.ChatOption>
			<S.ChatMsg ref={scrollRef}>
				{allMessages?.map((item, idx) => {
					return (
						<SellMessagesBox key={idx} allMessages={item} myInfo={myInfo} />
					)
				})}
				{!chatState && <h1>채팅방을 이용 할 수 없습니다.</h1>}
			</S.ChatMsg>
			<S.ChatSend onKeyDown={postMessage}>
				<S.StyledInput
					placeholder="메시지를 입력해주세요"
					ref={messagesInput}
					disabled={!chatState}
					// value={sendMessages}
					// onChange={e => {
					// 	setSendMessages(e.target.value)
					// }}
				/>

				<S.StyledButton onClick={postMessage} disabled={!chatState}>
					전송
				</S.StyledButton>
			</S.ChatSend>
		</S.ChatContainer>
	)
}

export default SellChatBox

const ChatContainer = styled.div`
	width: 55rem;
	height: 50rem;
	position: relative;
	display: flex;
	flex-direction: column;
	box-shadow: 1px 1px 1px gray;
	border-radius: 1rem;

	background-color: ${({ theme, chatState }) =>
		chatState ? theme.COLOR.common.gray[100] : theme.COLOR.common.gray[200]};
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
