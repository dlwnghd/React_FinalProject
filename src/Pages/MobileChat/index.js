import styled from 'styled-components'
import ChatUserBox from './UserBox/UserBox'
import { useRecoilState } from 'recoil'
import { myChatRoomList } from '../../Atoms/myChatRoomList.atom'
import MChatBox from './ChatBox'
import { useState } from 'react'
import { useSocket } from '../../Context/socket'

function UserList() {
	const [chatRoomList, setChatRoomList] = useRecoilState(myChatRoomList)
	const [viewChatState, setViewChatState] = useState(false)
	const [room_idx, setRoomIdx] = useState(null)
	const socket = useSocket()

	const onClickChatRoom = room_Idx => {
		socket.emit('join', { room_Idx })
		setRoomIdx(room_Idx)
		setViewChatState(true)
	}
	return (
		<>
			{!viewChatState &&
				chatRoomList.chats.map(list => (
					<S.ChatListContainer>
						<ChatUserBox list={list} onClickChatRoom={onClickChatRoom} />
						<S.ImgBox images={list.product.img_url} />
					</S.ChatListContainer>
				))}
			{viewChatState && (
				<MChatBox setViewChatState={setViewChatState} room_idx={room_idx} />
			)}
		</>
	)
}

export default UserList

const ChatListContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
`
const ImgBox = styled.div`
	width: 5.5rem;
	height: 5.5rem;
	margin-right: 2rem;
	background: ${({ images }) => (images ? `url(${images})` : '이미지없음')}
		no-repeat center center;
	background-size: cover;
`
const S = {
	ChatListContainer,
	ImgBox,
}
