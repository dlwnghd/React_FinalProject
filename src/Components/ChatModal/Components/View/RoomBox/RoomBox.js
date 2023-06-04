import { useState } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import ChatApi from '../../../../../Apis/chatApi'

function RoomBox({ prod_idx }) {
	const [roomList, setRoomList] = useState([])

	const getChatRoomList = async () => {
		try {
			const res = await ChatApi.prdChatList(prod_idx)
			setRoomList(res.data)
		} catch (error) {
			console.log('채팅룸 없어요.')
		}
	}

	useEffect(() => {
		getChatRoomList()
	}, [prod_idx])

	return (
		<S.RoomBoxContainer>
			<S.profileImgBox />
			<S.profileInfo></S.profileInfo>
		</S.RoomBoxContainer>
	)
}

export default RoomBox

const RoomBoxContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`
const profileImgBox = styled.div``

const profileInfo = styled.div``

const S = {
	RoomBoxContainer,
	profileImgBox,
	profileInfo,
}
