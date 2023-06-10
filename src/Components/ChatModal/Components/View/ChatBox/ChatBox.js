import styled from 'styled-components'
import Input from '../../../../Input/Input'
import Button from '../../../../Button/Button'
import { useState } from 'react'
import ChatApi from '../../../../../Apis/chatApi'
import { useEffect } from 'react'
import MessagesBox from './MessagesBox.js/MessagesBox'
import { useRecoilState } from 'recoil'
import { myChatRoomList } from '../../../../../Atoms/myChatRoomList.atom'
import { userInfoAtom } from '../../../../../Atoms/userInfo.atom'
import { useSocket } from '../../../../../Context/socket'
import { useRef } from 'react'

function ChatBox({ roomIdx }) {
	const socket = useSocket()
	const [myChatRoom, setMyChatRoom] = useRecoilState(myChatRoomList)
	const [myInfo, setMyInfo] = useRecoilState(userInfoAtom)

	//채팅방 리스트를 받아오고 room_idx와 동일한 채팅방 내역 불러오기
	const chatInfo = myChatRoom.chats.find(item => item.idx === roomIdx)
	const [allMessages, setAllMessages] = useState([])

	const messagesInput = useRef('')
	const [sendMessages, setSendMessages] = useState('')
	const [receivedMessages, setReceivedMessages] = useState([])

	const time = new Date()

	const newChatRoomList = async () => {
		try {
			const res = await ChatApi.chatRoomList()
			setMyChatRoom(res.data)
		} catch (err) {}
	}

	const getChatMsg = async () => {
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
		if (messagesInput.current.value !== '' && e.keyCode === 13) {
			socket.emit('sendMessage', data)
			try {
				const res = await ChatApi.sendMsg(roomIdx, messagesInput.current.value)

				if (res.status) {
					messagesInput.current.value = ''
					newChatRoomList()
				}
			} catch (error) {}

			return
		}
		if (messagesInput.current.value === '' && e.keyCode === 13) {
			alert('메세지를 입력해주세요')
			return
		}
	}
	useEffect(() => {
		getChatMsg()
	}, [roomIdx])

	useEffect(() => {
		// 메세지 수신
		socket.on('receiveMessage', data => {
			setReceivedMessages(list => [...list, data])
		})
	}, [socket])

	return (
		<S.ChatContainer>
			<S.ChatDate>
				<span>2023년 05월 20일</span>
				{/* 날짜는 last메신저로 설정 */}
			</S.ChatDate>
			<S.ChatMsg>
				{allMessages.map((item, idx) => {
					return <MessagesBox key={idx} allMessages={item} myInfo={myInfo} />
				})}
			</S.ChatMsg>
			<S.ChatSend onKeyDown={postMessage}>
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

export default ChatBox

const ChatContainer = styled.div`
	width: 55rem;
	height: 50rem;
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

		padding: 0.5rem;
		background-color: ${({ theme }) => theme.COLOR.common.white};
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`
const ChatMsg = styled.div`
	margin-top: 1rem;
	height: 90%;
	overflow-y: scroll;

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
	StyledButton,
	StyledInput,
}
