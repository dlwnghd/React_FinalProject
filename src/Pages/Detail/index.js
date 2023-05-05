import styled from 'styled-components'
import ProductInfo from './Components/ProductInfo'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import productsMock from '../../__mock__/Data/Product/product.data'
import { useState } from 'react'
import RecentBanner from '../Main/Components/Banner/RecentBanner'
import { useParams } from 'react-router'

function Detail() {
	//서버로부터 상품들을 요청하고 idx값과 일치하는 것 찾기
	const params = useParams()
	const { idx } = params

	// ex ) const findproduct = productsMock.find(item => item.idx === idx)

	const [product, setProduct] = useState(productsMock[0])
	return (
		<S.Wrapper>
			<ProductInfo product={product} />
			<Maps>
				<div>지도</div>
			</Maps>
			<S.PrdListBox>
				<RecentPrdList>
					<span>최근 본 상품 보러가기</span>
					<RecentBanner />
				</RecentPrdList>
				<AnotherPrdList>
					<span>다른 상품 보러가기</span>
					<div>다른 상품 리스트 영역</div>
				</AnotherPrdList>
			</S.PrdListBox>
		</S.Wrapper>
	)
}

export default Detail

const Wrapper = styled.div`
	padding: 12rem 0;
	${WidthAutoCSS}
	${GridCenterCSS}
	${ColumnNumberCSS(1)}
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

	${GridCenterCSS}
	${ColumnNumberCSS(1)}

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
