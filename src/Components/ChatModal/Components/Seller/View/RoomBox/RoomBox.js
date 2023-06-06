import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import ChatApi from '../../../../../../Apis/chatApi'

function SellRoomBox({ prod_idx, onClickUserChatRoom }) {
	const prd_idx = prod_idx

	const [productIdx, setProductIdx] = useState(prd_idx)
	const [roomList, setRoomList] = useState([])
	//셀러냐 아니냐의 따라 또 달라지네...
	console.log(roomList, '룸 리스트')
	const getChatRoomList = async () => {
		if (productIdx !== null && productIdx !== undefined) {
			try {
				const res = await ChatApi.prdChatList(productIdx)
				console.log('성공')
				setRoomList(res.data)
			} catch (error) {
				console.log('채팅룸 없어요.')
			}
		}
	}
	useEffect(() => {
		getChatRoomList()
	}, [productIdx])

	return (
		<S.RoomBoxContainer>
			{roomList &&
				roomList.map(user => {
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

export default SellRoomBox

const RoomBoxContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
	margin: 1rem 0;
	box-shadow: 1px 1px 1px gray;
	border-radius: 1rem;
`
const ProfileBox = styled.div`
	display: flex;
	width: 100%;
	padding: 1rem 0.1rem;
	height: 7rem;
	border-radius: 1rem;
	:hover {
		background-color: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
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
