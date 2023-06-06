import styled from 'styled-components'
import ChatBox from './ChatBox/ChatBox'
import RoomBox from './RoomBox/RoomBox'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import { useEffect } from 'react'
import { useSocket } from '../../../../Context/socket'
import { useState } from 'react'
import ChatApi from '../../../../Apis/chatApi'

function ChatView({ prod_idx, room_state }) {

	const [roomList, setRoomList] = useState([])
	const [roomIdx, setRoomIdx] = useState(null)
	const socket = useSocket()

	const getChatRoomList = async () => {
		try {
			const res = await ChatApi.prdChatList(prod_idx)
			setRoomList(res.data)
		} catch (error) {
			
		}
	}
	useEffect(() => {
		getChatRoomList()
	}, [prod_idx])

	const onClickUserChatRoom = room_idx => {
		setRoomIdx(room_idx)
		socket.emit('join', { room_idx })
		
	}

	return (
		<S.ChatViewContainer>
			<RoomBox prod_idx={prod_idx} onClickUserChatRoom={onClickUserChatRoom} />

			<ChatBox roomIdx={roomIdx} />
		</S.ChatViewContainer>
	)
}

export default ChatView

const ChatViewContainer = styled.div`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	border-radius: 3px;
`

const S = {
	ChatViewContainer,
}
