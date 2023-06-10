import styled from 'styled-components'

function SellChatItemBox({ list }) {
	const options = {
		timeZone: 'Asia/Seoul',
		hour12: true, // 오후/오후 구분을 위해 true로 설정합니다.
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}
	// 채팅방 중 가장 최근 메시지 시간 필터
	const times = list.map(item => item.lastMessageCreatedAt)
	times.sort((a, b) => new Date(b) - new Date(a))
	const utcDate = new Date(times[0])
	const koreanDate = utcDate.toLocaleString('ko-KR', options)

	return (
		<ItemContainer>
			<S.ImgBox images={list[0].product.img_url} />
			<S.DesBox>
				<p>{list[0].product.title}</p>
				<p>{list[0].product.price}원</p>
				<p>최근 메시지 : {koreanDate}</p>
			</S.DesBox>
		</ItemContainer>
	)
}

export default SellChatItemBox

const ItemContainer = styled.div`
	display: flex;
	gap: 1rem;

	padding: 1rem 1rem;
	width: 80%;
`
const ImgBox = styled.div`
	width: 8rem;
	height: auto;
	border: 1px solid black;
	background: ${({ images }) => (images ? `url(${images})` : '이미지없음')}
		no-repeat center center;
	background-size: cover;
`
const DesBox = styled.div``
const S = {
	ItemContainer,
	ImgBox,
	DesBox,
}
