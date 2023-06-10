import styled from 'styled-components'

function BuyMessagesBox({ allMessages, myInfo }) {
	const options = {
		timeZone: 'Asia/Seoul',
		hour12: true, // 오후/오후 구분을 위해 true로 설정합니다.
		hour: 'numeric',
		minute: 'numeric',
	}
	const utcDate = new Date(allMessages.createdAt)
	const koreanDate = utcDate.toLocaleString('ko-KR', options)

	return (
		<S.MessagesContainer msg={allMessages} myInfo={myInfo}>
			<S.profileImgBox msg={allMessages} myInfo={myInfo}></S.profileImgBox>
			<S.MessagesBox msg={allMessages} myInfo={myInfo}>
				<S.Messages msg={allMessages} myInfo={myInfo}>
					{allMessages.message}
				</S.Messages>
				<S.Time msg={allMessages} myInfo={myInfo}>
					{koreanDate}
				</S.Time>
			</S.MessagesBox>
		</S.MessagesContainer>
	)
}

export default BuyMessagesBox

const MessagesContainer = styled.div`
	display: ${({ msg }) =>
		msg.message === '채팅방을 생성합니다' ? 'none' : 'flex'};
	gap: 0.3rem;
	align-items: ${({ msg, myInfo }) =>
		msg.User.nick_name === myInfo.nickName ? 'center' : 'flex-end'};
	justify-content: ${({ msg, myInfo }) =>
		msg.User.nick_name === myInfo.nickName ? 'flex-end' : 'flex-start'};
	position: relative;
	margin: 1rem 1rem;
`
const profileImgBox = styled.div`
	width: 5rem;
	height: 5rem;
	border-radius: 3rem;
	background: ${({ msg, myInfo }) =>
			msg.User.nick_name === myInfo.nickName
				? null
				: `url(${msg.User.profile_url})`}
		no-repeat center center;
	background-size: cover;
`
const MessagesBox = styled.div`
	display: flex;
	align-items: flex-end;
	flex-direction: ${({ msg, myInfo }) =>
		msg.User.nick_name === myInfo.nickName ? 'row-reverse' : 'row'};
	position: relative;
	gap: 0.3rem;
`
const Messages = styled.span`
	border-radius: 4rem;
	padding: 0.3rem 0.8rem;
	background-color: ${({ theme, msg, myInfo }) =>
		msg.User.nick_name === myInfo.nickName
			? theme.COLOR.main
			: theme.COLOR.common.white};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`
const Time = styled.span`
	font-size: 0.5rem;

	flex-direction: row-reverse;
`

const S = {
	MessagesBox,
	profileImgBox,
	MessagesContainer,
	Messages,
	Time,
}
