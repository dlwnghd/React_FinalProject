import styled from 'styled-components'
import { useState } from 'react'
import ChatItemBox from './ItemBox/ItemBox'
import ChatView from '../View'

function ChatList() {
	const [chatRoom, setChatRoom] = useState(false)

	const onClickChatRoom = () => {
		setChatRoom(true)
	}

	return (
		<S.ChatListContainer>
			{chatRoom ? (
				<>
					<ChatView />
				</>
			) : (
				<>
					<ChatItemBox />
					<button onClick={onClickChatRoom}>채팅방 입장</button>
				</>
			)}
		</S.ChatListContainer>
	)
}

export default ChatList

const ChatListContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	& > button {
		position: absolute;
		border: none;
		background-color: #fff;
		width: 10rem;
		height: 3rem;
		bottom: 0;
		right: 0;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		cursor: pointer;
	}
`
const S = {
	ChatListContainer,
}
