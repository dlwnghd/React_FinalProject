import styled from 'styled-components'

function MessagesBox() {
	return (
		<S.MessagesContainer>
			<S.Messages>안녕하세요 반가워요</S.Messages>
			<S.Time>오후 7:26</S.Time>
		</S.MessagesContainer>
	)
}

export default MessagesBox

const MessagesContainer = styled.div`
	display: flex;
	gap: 0.3rem;
	align-items: center;
	position: relative;
`

const Messages = styled.span`
	border-radius: 4rem;
	padding: 0.3rem 0.8rem;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`
const Time = styled.span`
	font-size: 0.5rem;
`

const S = {
	MessagesContainer,
	Messages,
	Time,
}
