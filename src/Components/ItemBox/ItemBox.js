import styled from 'styled-components'
import {
	EtcOption_Icon,
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../Icons/Icons'
import { useState } from 'react'
import { FlexBetweenCSS } from '../../Styles/common'

// 컴포넌트 불러올 때, props로
// 데이터(상품 이미지, 상품 제목, 상품 설명, 상품 가격) 보내와서 입히기
function ItemBox({ posterPath, title, context, price, isLiked }) {
	const [isHeart, setIsHeart] = useState(isLiked)

	const onHeart = () => {
		setIsHeart(prev => !prev)
	}

	return (
		<S.Wrapper>
			<S.ItemContainer posterIMG={posterPath}>
				{!isHeart ? (
					<NotFillHeart_Icon size="20" onClick={onHeart} />
				) : (
					<FillHeart_Icon size="20" onClick={onHeart} />
				)}
			</S.ItemContainer>
			<S.DescContainer>
				<S.DescBox context={context}>
					<h4>{title}</h4>
					{context !== '' ? <p>{context}</p> : <EtcOption_Icon size="30" />}
				</S.DescBox>
				<h4>{price.toLocaleString()}원</h4>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ItemBox

const Wrapper = styled.div`
	width: 27.6rem;
	cursor: pointer;
`

const ItemContainer = styled.div`
	position: relative;
	width: 100%;
	height: 27.6rem;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;

	& > button {
		position: absolute;
		top: 2rem;
		right: 2rem;
		background: none;
		border: none;
		z-index: 999;
	}

	& > svg {
		position: absolute;
		cursor: pointer;
		top: 2rem;
		right: 2rem;
		color: red;
		// 파람으로 보낼 데이터의 디폴트와 변수를 구분해서 삼항 연산자로 정리
	}
`

const DescContainer = styled.div`
	margin-top: 2rem;

	& > div > p {
		margin: 1rem 0 2rem;
	}
`

const DescBox = styled.div`
	${({ context }) => context === '' && FlexBetweenCSS}
`

const S = {
	Wrapper,
	ItemContainer,
	DescContainer,
	DescBox,
}
