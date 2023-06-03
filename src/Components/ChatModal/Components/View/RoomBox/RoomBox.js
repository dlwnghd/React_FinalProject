import { useState } from 'react'
import styled from 'styled-components'
import ChatApi from '../../../../../Apis/chatApi'
import { useEffect } from 'react'

function RoomBox({ prod_idx }) {
	// user_idx와 api 통신으로 비교해서 해당 유저 프로필 입혀야함.
	const [roomList, setRoomList] = useState([])

	const getChatRooms = async () => {
		try {
			const res = await ChatApi.prdChatList(prod_idx)

			console.log(res)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getChatRooms()
	}, [prod_idx])
	console.log(prod_idx)
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
