import styled from 'styled-components'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userInfoAtom } from '../../../Atoms/userInfo.atom'

function ChatUserBox({ list, onClickChatRoom }) {
	const [infor, setInfor] = useRecoilState(userInfoAtom)
	const [chat, setChat] = useState([])

	const a = infor.region.split(' ')

	const options = {
		timeZone: 'Asia/Seoul',
		hour12: true, // 오후/오후 구분을 위해 true로 설정합니다.
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}
	const utcDate = new Date(list.lastMessageCreatedAt)
	const korTime = utcDate.toLocaleString('ko-KR', options)

	return (
		<ItemContainer
			onClick={() => {
				onClickChatRoom(list.idx)
			}}
		>
			{/* <S.ImgBox images={list.profile_img} /> */}
			<S.DesBox>
				<S.Content>
					<p>{list.User.nick_name}</p>
					<span>
						<p>{a[2]}</p>
						<p>{korTime}</p>
					</span>
				</S.Content>
				<S.Msg>{list.lastMessage}</S.Msg>
			</S.DesBox>
		</ItemContainer>
	)
}

export default ChatUserBox

const ItemContainer = styled.div`
	display: flex;
	gap: 1rem;

	padding: 1rem 1rem;
	width: 80%;
`
const ImgBox = styled.div`
	width: 7rem;
	height: 7rem;

	border-radius: 50%;
	background: ${({ images }) => (images ? `url(${images})` : '이미지없음')}
		no-repeat center center;
	background-size: cover;
`
const DesBox = styled.div`
	display: flex;
	flex-direction: column;
`
const Content = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	& > p {
		margin-right: 1rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	}
	& > span {
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
		display: flex;
		& > p {
			font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
			margin-right: 1rem;
		}
	}
`
const Msg = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
`
const S = {
	ItemContainer,
	ImgBox,
	DesBox,
	Content,
	Msg,
}
