import styled from 'styled-components'
import ProductInfo from './Components/ProductInfo'
import { FlexCenterCSS, WidthAutoCSS } from '../../Styles/common'
import productsMock from '../../__mock__/Data/Product/product.data'
import { useState } from 'react'

function Detail() {
	const [product, setProduct] = useState(productsMock[0])
	return (
		<>
			<S.Wrapper>
				<ProductInfo prd={product} />
				<Maps>
					<div>지도</div>
				</Maps>
				<S.PrdListBox>
					<RecentPrdList>
						<span>최근 본 상품 보러가기</span>
						<div>최근 본 상품 리스트 영역</div>
					</RecentPrdList>
					<AnotherPrdList>
						<span>다른 상품 보러가기</span>
						<div>다른 상품 리스트 영역</div>
					</AnotherPrdList>
				</S.PrdListBox>
			</S.Wrapper>
		</>
	)
}

export default Detail

const Wrapper = styled.div`
	${WidthAutoCSS}
	${FlexCenterCSS}
	flex-direction: column;
	gap: 3rem;
`
const Maps = styled.div`
	width: 100%;
	border: 1px solid black;
	height: 25rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile};) {
		width: 100%;
	}
`
const PrdListBox = styled.div`
	width: 100%;
	border: 1px soild black;

	${FlexCenterCSS}
	flex-direction: column;
	gap: 3rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile};) {
		width: 95%;
	}
`
const RecentPrdList = styled.div`
	width: 100%;

	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}
	& > div {
		width: 100%;
		height: 20rem;
		border: 1px solid black;
	}
`
const AnotherPrdList = styled.div`
	width: 100%;
	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}
	& > div {
		width: 100%;
		height: 20rem;
		border: 1px solid black;
	}
`
const S = {
	Wrapper,
	PrdListBox,
}
