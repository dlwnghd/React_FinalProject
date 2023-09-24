import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../../Styles/common'
import { useEffect } from 'react'
import { useSocket } from '../../../../../Context/socket'
import { useState } from 'react'
import ChatApi from '../../../../../Apis/chatApi'
import SellRoomBox from './RoomBox/RoomBox'
import SellChatBox from './ChatBox/ChatBox'

function ChatView({ prod_idx, setViewChatState }) {
	const [roomList, setRoomList] = useState([])
	const [room_idx, setRoomIdx] = useState()
	const socket = useSocket()
	const getChatRoomList = async () => {
		try {
			const res = await ChatApi.prdChatList(prod_idx)
			setRoomList(res.data)
		} catch (error) {
			throw error
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
			<SellRoomBox
				prod_idx={prod_idx}
				onClickUserChatRoom={onClickUserChatRoom}
			/>
			<SellChatBox room_idx={room_idx} setViewChatState={setViewChatState} />
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
