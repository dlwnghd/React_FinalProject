import styled from 'styled-components'
import { FillHeart_Icon, NotFillHeart_Icon } from '../Icons/Icons'

// 컴포넌트 불러올 때, props로
// 데이터(상품 이미지, 상품 제목, 상품 설명, 상품 가격) 보내와서 입히기
function ItemBox({ posterPath, title, context, price, isLiked }) {
	return (
		<S.Wrapper>
			<S.ItemContainer posterIMG={posterPath}>
				{isLiked === 0 ? (
					<NotFillHeart_Icon size="20" color="red" />
				) : (
					<FillHeart_Icon />
				)}
			</S.ItemContainer>
			<S.DescContainer>
				<h4>{title}</h4>
				<p>{context}</p>
				<h4>{price}</h4>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ItemBox

const Wrapper = styled.div`
	width: 27.6rem;
`

const ItemContainer = styled.div`
	position: relative;
	width: 100%;
	height: 27.6rem;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;

	& > svg {
		position: absolute;
		top: 2rem;
		right: 2rem;
		size: ${({ size }) => (size !== '' ? '10' : size)};
		color: ${({ color }) => (color !== '' ? 'black' : color)};
		// 파람으로 보낼 데이터의 디폴트와 변수를 구분해서 삼항 연산자로 정리
	}
`

const DescContainer = styled.div`
	margin-top: 2rem;

	& > p {
		margin: 1rem 0 2rem;
	}
`

const S = {
	Wrapper,
	ItemContainer,
	DescContainer,
}
