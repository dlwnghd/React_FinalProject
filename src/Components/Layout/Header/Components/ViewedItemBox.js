import styled from 'styled-components'
import { DeleteProduct_Icon } from '../../../Icons/Icons'
import ProductApi from '../../../../Apis/productApi'
import { FlexBetweenCSS } from '../../../../Styles/common'

function ViewedItemBox({
	refetch,
	posterPath,
	title,
	price,
	isLiked,
	createdAt,
	status,
	prod_idx,
	...rest
}) {
	const onDeleteView = async prod_idx => {
		try {
			await ProductApi.deleteViewedList(prod_idx)
			refetch()
		} catch (error) {
			console.error('아이템 삭제에 실패했습니다ㅠㅠ', error)
		}
	}

	return (
		<S.Wrapper>
			<DeleteProduct_Icon
				size="20"
				color="black"
				onClick={() => onDeleteView(prod_idx)}
			/>
			<S.IMGContainer posterIMG={posterPath} {...rest}></S.IMGContainer>
			<S.DescContainer {...rest}>
				<S.DescBox>
					<h5>{status}</h5>
					<h4>{title}</h4>
					<span>{price.toLocaleString()}원</span>
				</S.DescBox>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ViewedItemBox

const Wrapper = styled.div`
	position: relative;
	${FlexBetweenCSS}
	flex-direction: column;
	position: relative;
	padding: 1rem 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;

	& > svg {
		position: absolute;
		width: 2rem;
		height: 2rem;
		padding: 0.2rem;
		z-index: 999;
		cursor: pointer;
		top: 1rem;
		right: 0;
		border-radius: 50%;

		color: ${({ theme }) => theme.COLOR.main};
		background: ${({ theme }) => theme.COLOR.common.white};
		border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[200]};
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		flex-direction: row;

		& > svg {
			width: 3rem;
			height: 3rem;
			right: 0;
			bottom: 0;
		}
	}
`

const IMGContainer = styled.div`
	position: relative;
	cursor: pointer;
	width: 100%;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;
	box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.2);

	&::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 17.4rem;
		height: 17.4rem;
	}
`

const DescContainer = styled.div`
	${FlexBetweenCSS}
	cursor: pointer;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: baseline;
	font-size: 50%;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 55%;
	}
`

const DescBox = styled.div`
	margin-top: 1rem;
	width: 100%;
	height: 100%;
	display: flex;
	gap: 3px;
	flex-direction: column;
	${({ context }) => context === '' && FlexBetweenCSS}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		& > h5 {
			font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		}
		& > h4 {
			font-size: ${({ theme }) => theme.FONT_SIZE.big};
		}
		& > span {
			font-size: ${({ theme }) => theme.FONT_SIZE.large};
		}
	}

	& > h4 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	& > h5 {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}

	& > p {
		margin: 1rem 0 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`

const DescBox2 = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
`

const S = {
	Wrapper,
	IMGContainer,
	DescContainer,
	DescBox,
	DescBox2,
}
