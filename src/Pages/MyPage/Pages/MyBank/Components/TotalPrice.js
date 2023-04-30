import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../../../../Styles/common'

function TotalPrice() {
	return (
		<S.Wrapper>
			<S.PriceWrap>
				<S.PriceTitle>총 판매 금액</S.PriceTitle>
				<S.PriceDetail>100,257,000 원</S.PriceDetail>
			</S.PriceWrap>
			<S.PriceWrap>
				<S.PriceTitle>총 구매 금액</S.PriceTitle>
				<S.PriceDetail>9,257,000 원</S.PriceDetail>
			</S.PriceWrap>
			<S.PriceWrap>
				<S.PriceTitle>이번달 판매 금액</S.PriceTitle>
				<S.PriceDetail>1,062,500 원</S.PriceDetail>
			</S.PriceWrap>
			<S.PriceWrap>
				<S.PriceTitle>이번달 구매 금액</S.PriceTitle>
				<S.PriceDetail>282,500 원</S.PriceDetail>
			</S.PriceWrap>
		</S.Wrapper>
	)
}
export default TotalPrice

const Wrapper = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	${WidthAutoCSS}
	justify-items: flex-start
`

const PriceWrap = styled.div`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(4)} justify-items: flex-start;
`
const PriceTitle = styled.span`
	grid-column-start: 1;
	grid-column-end: 2;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	height: 40px;
	${GridCenterCSS}
`
const PriceDetail = styled.span`
	grid-column-start: 2;
	grid-column-end: 5;
	background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
	width: 100%;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	height: 40px;
	${GridCenterCSS}
	border-radius: 3rem;
`
const S = { Wrapper, PriceWrap, PriceTitle, PriceDetail }
