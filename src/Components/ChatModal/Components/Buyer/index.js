import { useState } from 'react'
import BuyRoomBox from './View/RoomBox/RoomBox'
import { useSocket } from '../../../../Context/socket'
import BuyChatBox from './View/ChatBox/ChatBox'
import styled from 'styled-components'

function BuyerChat({ list }) {
	const socket = useSocket()
	const [roomIdx, setRoomIdx] = useState()

	const onSetRoomIdx = room_idx => {
		setRoomIdx(room_idx)
		socket.emit('join', { room_idx })
	}
	return (
		<S.BuyerChatContainer>
			<BuyRoomBox list={list} onSetRoomIdx={onSetRoomIdx} />
			<BuyChatBox roomIdx={roomIdx} />
		</S.BuyerChatContainer>
	)
}

const BuyerChatContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	gap: 1rem;
	padding-bottom: 1rem;
`
const S = {
	BuyerChatContainer,
}
export default BuyerChat
