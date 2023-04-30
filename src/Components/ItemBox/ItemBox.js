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

	const onEdit = () => {}

	return (
		<S.Wrapper>
			<S.IMGContainer posterIMG={posterPath}>
				{!isHeart ? (
					<NotFillHeart_Icon size="20" onClick={onHeart} />
				) : (
					<FillHeart_Icon size="20" onClick={onHeart} />
				)}
			</S.IMGContainer>
			<S.DescContainer>
				<S.DescBox context={context}>
					<h4>{title}</h4>
					{context !== '' ? (
						<p>{context}</p>
					) : (
						<EtcOption_Icon size="30" onClick={onEdit} />
					)}
				</S.DescBox>
				<h4>{price.toLocaleString()}원</h4>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ItemBox

const Wrapper = styled.div`
	${FlexBetweenCSS}
	flex-direction: column;
	cursor: pointer;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
`

const IMGContainer = styled.div`
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
	${FlexBetweenCSS}
	width:100%;
	padding: 0 1rem;
	flex-direction: column;
	align-items: baseline;
	margin-top: 2rem;
	/* background: red; */
`

const DescBox = styled.div`
	width: 100%;
	${({ context }) => context === '' && FlexBetweenCSS}

	& > p {
		margin: 1rem 0 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space: nowrap; 1줄로 넘친 글자를 생략할 때 이용 */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
`

const S = {
	Wrapper,
	IMGContainer,
	DescContainer,
	DescBox,
}
