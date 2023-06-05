import styled from 'styled-components'
import { DeleteProduct_Icon } from '../../../Icons/Icons'
import ProductApi from '../../../../Apis/productApi'
import { FlexBetweenCSS, WidthAutoCSS } from '../../../../Styles/common'

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
	${WidthAutoCSS}
	height: 100%;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;

	& > svg {
		position: absolute;
		z-index: 999;
		cursor: pointer;
		top: 1rem;
		right: 1rem;
		color: ${({ theme }) => theme.COLOR.main};
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		flex-direction: row;
	}
`

const IMGContainer = styled.div`
	position: relative;
	cursor: pointer;
	width: 7.2rem;
	height: 7.2rem;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;
	box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 17rem;
		height: 17rem;
	}
`

const DescContainer = styled.div`
	${FlexBetweenCSS}
	cursor: pointer;
	width: 100%;
	height: 100%;
	padding: 0 1rem;
	flex-direction: column;
	align-items: baseline;
	font-size: 50%;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 50%;
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
		/* white-space: nowrap; 1줄로 넘친 글자를 생략할 때 이용 */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
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
