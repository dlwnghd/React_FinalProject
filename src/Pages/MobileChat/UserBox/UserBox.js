import styled from 'styled-components'

function ChatUserBox({ list }) {
	//이것도 만들어져 있는거 위에 코드만 지우고 목데이터 적용해서 html, css 조금 수정한거에요

	return (
		<ItemContainer>
			<S.ImgBox images={list.profile_img} />
			<S.DesBox>
				<S.Content>
					<p>{list.nickName}</p>
					<span>
						<p>{list.region}</p>
						<p>{list.day}</p>
					</span>
				</S.Content>
				<S.Msg>{list.content}</S.Msg>
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
