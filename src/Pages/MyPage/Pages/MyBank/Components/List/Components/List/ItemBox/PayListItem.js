import styled from 'styled-components'
import { FlexBetweenCSS } from '../../../../../../../../../Styles/common'
import Button from '../../../../../../../../../Components/Button/Button'

function PayListItem({ item, category }) {
	const categoryText = category === 'seller' ? '판매완료' : '구매완료'
	const { idx, createdAt, product } = item

	return (
		<S.Wrapper>
			<S.IMGContainer posterIMG={product.img_url} />
			<S.DescContainer>
				<S.DescBox>
					<div>
						<p>{categoryText}</p>
						<p>{createdAt}</p>
						<h4>{product.price.toLocaleString()}원</h4>
					</div>
					{category === 'buyer' && (
						<S.StyledButton shape={'square'}>리뷰 남기기</S.StyledButton>
					)}
				</S.DescBox>
			</S.DescContainer>
		</S.Wrapper>
	)
}
export default PayListItem

const Wrapper = styled.div`
	${FlexBetweenCSS}
	position: relative;
	width: 100%;
	height: 27.6rem;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;
`

const IMGContainer = styled.div`
	position: relative;
	cursor: pointer;
	width: 100%;
	height: 100%;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;
`

const DescContainer = styled.div`
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: 100%;
	padding: 0 0 0 1rem;
	align-items: flex-start;
`

const DescBox = styled.div`
	height: 100%;
	${FlexBetweenCSS}
	text-align: end;
	align-items: flex-end;
	flex-direction: column;
	padding-top: 1rem;

	& > div > p:first-child {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}

	& > div > h4 {
		margin-top: 2rem;
	}
`

const StyledButton = styled(Button)`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	width: 100%;
	height: 4rem;
`

const S = {
	Wrapper,
	IMGContainer,
	DescContainer,
	DescBox,
	StyledButton,
}
