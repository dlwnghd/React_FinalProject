import styled from 'styled-components'
import Input from '../../../../Input/Input'
import Button from '../../../../Button/Button'
import { useState } from 'react'
import { io } from 'socket.io-client'
import MessagesBox from './MessagesBox.js/MessagesBox'

const socket = io('https://topdragon.co.kr/api/chat')
function ChatBox() {
	const socket = io.connect('http')
	const [chat, setChat] = useState('')
	const [receivedMessages, setReceivedMessages] = useState([])

	const sendMessage = () => {
		socket.emit()
	}
	return (
		<S.ChatContainer>
			<S.ChatDate>
				<span>2023년 05월 20일</span>
			</S.ChatDate>
			<S.ChatMsg>
				<MessagesBox />
			</S.ChatMsg>
			<S.ChatSend>
				<Input placeholder="메시지를 입력해주세요" />
				<Button onClick={sendMessage}>보내기</Button>
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

	justify-content: center;
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
`
const ChatSend = styled.div`
	height: 10%;
	display: flex;
`
const S = {
	ChatContainer,
	ChatDate,
	ChatMsg,
	ChatSend,
}
