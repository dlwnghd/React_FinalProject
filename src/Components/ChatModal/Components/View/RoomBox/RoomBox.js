import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import ChatApi from '../../../../../Apis/chatApi'

function RoomBox({ prod_idx, onClickUserChatRoom }) {
	const [roomList, setRoomList] = useState([])
	const getChatRoomList = async () => {
		try {
			const res = await ChatApi.prdChatList(prod_idx)
		} catch (err) {}
			setRoomList(res.data)
		} 
	}
	useEffect(() => {
		getChatRoomList()
	}, [prod_idx])

	return (
		<S.RoomBoxContainer>
			{roomList.chat?.map(user => {
				return (
					<S.ProfileBox
						onClick={() => {
							onClickUserChatRoom(user.idx)
						}}
					>
						<S.ProfileImg />
						<S.profileInfo>
							<S.userNickname>{user.User.nick_name}</S.userNickname>
							<p>{user.lastMessageCreateAt}</p>
							<p>{user.isRead ? '읽음' : '안읽음'}</p>
						</S.profileInfo>
					</S.ProfileBox>
				)
			})}
		</S.RoomBoxContainer>
	)
}

export default RoomBox

const RoomBoxContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
	border: 1px solid green;

	margin: 1rem 0;
`
const ProfileBox = styled.div`
	display: flex;

	margin: 1rem 0;
`
const ProfileImg = styled.div``

const profileInfo = styled.div`
	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`

const userNickname = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`

const S = {
	RoomBoxContainer,
	ProfileBox,
	ProfileImg,
	profileInfo,
	userNickname,
}
