import styled from 'styled-components'
import Input from '../../../../Input/Input'
import Button from '../../../../Button/Button'
import { useEffect, useState } from 'react'
import MessagesBox from './MessagesBox.js/MessagesBox'
import { io } from 'socket.io-client'

const socket = io.connect('https://topdragon.co.kr')

function ChatBox() {
	const room_idx = 29
	socket.emit('connect-user', {
		socket: '815ec613-59fa-46e7-a1c2-9a52244ad67f',
	})

	socket.emit('join', { room_idx })

	const [chat, setChat] = useState('')
	const [sendMessages, setSendMessages] = useState('')
	const [receivedMessages, setReceivedMessages] = useState([])

	const sendMessage = e => {
		const data = {
			title: '치킨',
			createdAt:
				new Date(Date.now()).getHours() +
				':' +
				new Date(Date.now()).getMinutes(),

			prod_idx: 224,
			room_idx: 29,
			nicKname: '제이콥',

			message: sendMessages,

			isSeller: 1,
		}
		if (sendMessages !== '' && e.keyCode === 13) {
			console.log(sendMessages)

			socket.emit('sendMessage', data)
			setSendMessages('')
		}
		if (sendMessages === '' && e.keyCode === 13) {
			alert('메세지를 입력해주세요')
		}
	}

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
			</S.ChatDate>
			<S.ChatMsg>
				{receivedMessages &&
					receivedMessages.map((item, idx) => {
						return <MessagesBox key={idx} msg={item} />
					})}
			</S.ChatMsg>
			<S.ChatSend onKeyDown={sendMessage}>
				<Input
					placeholder="메시지를 입력해주세요"
					value={sendMessages}
					onChange={e => {
						setSendMessages(e.target.value)
					}}
				/>

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
