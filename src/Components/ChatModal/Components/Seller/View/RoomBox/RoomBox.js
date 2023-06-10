import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import ChatApi from '../../../../../../Apis/chatApi'

function SellRoomBox({ prod_idx, onClickUserChatRoom }) {
	const prd_idx = prod_idx
	const [productIdx, setProductIdx] = useState(prd_idx)
	const [roomList, setRoomList] = useState([])
	const [select, setSelect] = useState(null)
	const options = {
		timeZone: 'Asia/Seoul',
		hour12: true, // 오후/오후 구분을 위해 true로 설정합니다.
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}

	const onClickSelect = id => {
		setSelect(id)
	}

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
					const utcDate = new Date(user.lastMessageCreatedAt)
					const korTime = utcDate.toLocaleString('ko-KR', options)
					return (
						<S.ProfileBox
							selectId={select}
							roomId={user.idx}
							onClick={() => {
								onClickUserChatRoom(user.idx)
								onClickSelect(user.idx)
							}}
						>
							<S.ProfileImg />
							<S.profileInfo>
								<S.userNickname>닉네임 : {user.User.nick_name}</S.userNickname>
								<p>{korTime}</p>
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
	margin-bottom: 0.5rem;
	height: 7rem;
	border-radius: 1rem;
	box-shadow: ${({ theme, roomId, selectId }) =>
		roomId === selectId
			? '2px 2px 1px 0px' + theme.COLOR.common.gray[200]
			: ''};
	:hover {
		/* background-color: ${({ theme }) => theme.COLOR.common.gray[200]}; */
		box-shadow: 2px 2px 1px 0px ${({ theme }) => theme.COLOR.common.gray[200]};
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
