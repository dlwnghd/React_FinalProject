import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../../Styles/common'

function ChatItemBox() {
	return (
		<ItemContainer>
			<S.ImgBox />
			<S.DesBox>
				<p>네모난 고양이</p>
				<p>0원</p>
				<p>오후 5:40</p>
			</S.DesBox>
		</ItemContainer>
	)
}

export default ChatItemBox

const ItemContainer = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
`
const ImgBox = styled.div`
	width: 8rem;
	height: 8rem;
	border: 1px solid black;
`
const DesBox = styled.div``
const S = {
	ItemContainer,
	ImgBox,
	DesBox,
}
