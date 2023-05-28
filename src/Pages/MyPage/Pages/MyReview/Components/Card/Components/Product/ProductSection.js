import styled from 'styled-components'
import { FlexBetweenCSS } from '../../../../../../../../Styles/common'
import getFormattedDate from '../../../../../../../../Utils/getFormattedDate'

function ProductSection({ product, date }) {
	const { title, price, img_url } = product

	return (
		<S.Wrapper>
			<S.IMGContainer imgURL={img_url} />
			<S.Container>
				<S.Title>{title}</S.Title>
				<p>{price.toLocaleString()} 원</p>
				<p>구매일 : {getFormattedDate(new Date(date))}</p>
			</S.Container>
		</S.Wrapper>
	)
}
export default ProductSection

const Wrapper = styled.div`
	height: 40%;
	padding: 3rem;
	${FlexBetweenCSS}
`

const IMGContainer = styled.div`
	position: relative;
	cursor: pointer;
	width: 100%;
	height: 100%;
	background: ${({ imgURL }) => `url(${imgURL})`} no-repeat center center;
	background-size: cover;
`

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 1.5rem;

	& > p:last-child {
		margin-top: 2rem;
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
		font-size: ${({ theme }) => theme.FONT_SIZE.small};

		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		}
	}
`

const Title = styled.p`
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	margin-bottom: 0.5rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	}
`

const S = { Wrapper, IMGContainer, Container, Title }
