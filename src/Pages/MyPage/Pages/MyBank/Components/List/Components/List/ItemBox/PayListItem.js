import styled from 'styled-components'
import { FlexBetweenCSS } from '../../../../../../../../../Styles/common'
import Button from '../../../../../../../../../Components/Button/Button'
import getFormattedDate from '../../../../../../../../../Utils/getFormattedDate'

function PayListItem({ item, category }) {
	const categoryText = category === 'seller' ? '판매완료' : '구매완료'
	const { idx, createdAt, Product } = item

	return (
		<S.Wrapper>
			<S.IMGContainer posterIMG={Product.img_url} />
			<S.DescContainer>
				<S.DescBox>
					<div>
						<S.BoldText>{categoryText}</S.BoldText>
						<p>{getFormattedDate(new Date(createdAt))}</p>
					</div>
					<div>
						<p>{Product.title}</p>
						<S.BoldText>{Product.price.toLocaleString()}원</S.BoldText>
					</div>
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
	height: 20rem;
	max-height: 20rem;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;
	box-shadow: 0 4px 14px rgba(48, 52, 65, 0.12);
	border-radius: 0.3rem;
	padding: 1rem;
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
`

const BoldText = styled.p`
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
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
	BoldText,
	StyledButton,
}
