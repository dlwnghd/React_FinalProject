import styled from 'styled-components'

function MessagesBox({ allMessages, myInfo }) {
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
			<div>
				<S.Messages msg={allMessages} myInfo={myInfo}>
					{allMessages.message}
				</S.Messages>
				<S.Time msg={allMessages} myInfo={myInfo}>
					{koreanDate}
				</S.Time>
			</div>
		</S.MessagesContainer>
	)
}

export default MessagesBox

const MessagesContainer = styled.div`
	display: flex;
	gap: 0.3rem;
	align-items: center;
	justify-content: ${({ msg, myInfo }) =>
		msg.message === '채팅방을 생성합니다'
			? 'center'
			: msg.User.nick_name === myInfo.nickName
			? 'flex-end'
			: 'flex-start'};

	position: relative;
	margin: 1rem 1rem;
	& > div {
		display: flex;
		align-items: flex-end;
		flex-direction: ${({ msg, myInfo }) =>
			msg.User.nick_name === myInfo.nickName ? 'row-reverse' : 'row'};
		position: relative;
		gap: 0.3rem;
	}
`

const Messages = styled.span`
	border-radius: 4rem;
	padding: 0.3rem 0.8rem;
	background-color: ${({ theme, msg, myInfo }) =>
		msg.User.nick_name === myInfo.nickName ||
		msg.message === '채팅방을 생성합니다'
			? theme.COLOR.main
			: theme.COLOR.common.white};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`
const Time = styled.span`
	font-size: 0.5rem;
	display: ${({ msg }) =>
		msg.message === '채팅방을 생성합니다' ? 'none' : 'block'};
	flex-direction: row-reverse;
`

const S = {
	MessagesContainer,
	Messages,
	Time,
}
