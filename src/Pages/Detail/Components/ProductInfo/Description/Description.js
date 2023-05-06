import styled from 'styled-components'
import { useState } from 'react'
import {
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../../../../../Components/Icons/Icons'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../../Styles/common'
import { useNavigate } from 'react-router'
function PrdDescription({ product }) {
	const { title, price, description, ProductsTags } = product
	const [like, setLike] = useState(false)
	const navigate = useNavigate()

	const onClickLike = () => {
		setLike(prev => !prev)
	}
	return (
		<S.DescriptionWrapper>
			<S.DetailBox>
				<S.TitleBox>
					<Title>{title}</Title>
					<SubTitle>별나게 우수운 고양이, 다채로운 컬러</SubTitle>
				</S.TitleBox>
				<S.PriceBox>
					<Price>{price}원</Price>
				</S.PriceBox>
				<S.CtaBox>
					<Cta>{description} </Cta>
				</S.CtaBox>
			</S.DetailBox>
			<S.OptionBox>
				<S.HeartBox onClick={onClickLike}>
					<span>찜</span>
					{like ? <FillHeart_Icon /> : <NotFillHeart_Icon />}
				</S.HeartBox>
				<S.TagBox>
					{ProductsTags.map((item, idx) => {
						return (
							<Tag key={idx} onClick={() => navigate(`/search/${item.tag}`)}>
								<span>#{item.tag}</span>
							</Tag>
						)
					})}
				</S.TagBox>
				<S.ButtonBox>
					<Button>채팅</Button>
					<Button>결제</Button>
				</S.ButtonBox>
			</S.OptionBox>
		</S.DescriptionWrapper>
	)
}

export default PrdDescription

const DescriptionWrapper = styled.section`
	${GridCenterCSS}
	justify-items: flex-start;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	height: 484px;
`
const DetailBox = styled.div`
	${GridCenterCSS}
	justify-items: flex-start;
	width: 100%;
	align-items: flex-start;
`
const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
const Title = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`
const SubTitle = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`
const PriceBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
const Price = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.big};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`
const CtaBox = styled.div`
	height: 15rem;
`
const Cta = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`
const OptionBox = styled.div`
	${GridCenterCSS}
	justify-items: flex-start;
	widows: 100%;

	row-gap: 1rem;
`
const HeartBox = styled.div`
	width: 5rem;
	height: 5rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;
	:hover {
		cursor: pointer;
	}
	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	}
	& > svg {
		font-size: ${({ theme }) => theme.FONT_SIZE.big};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
		color: red;
	}
`
const TagBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(5)}
	justify-items: flex-start;
`
const Tag = styled.div`
	border: 1px solid black;
	padding: 1rem 0.5rem;
	cursor: pointer;
	border-radius: 3px;
	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
		text-align: center;
	}
`
const ButtonBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	width: 100%;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		flex-direction: column;
	}
`

const Button = styled.button`
	width: 100%;
	height: 7.2rem;
	border-radius: 1rem;
	border: 1px solid ${({ theme }) => theme.COLOR.main};
	background-color: ${({ theme }) => theme.COLOR.common.white};
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		width: 100%;
	}
	:hover {
		cursor: pointer;
		background-color: ${({ theme }) => theme.COLOR.hover};
	}
`

const S = {
	DescriptionWrapper,
	DetailBox,
	TitleBox,
	PriceBox,
	CtaBox,
	OptionBox,
	HeartBox,
	ButtonBox,
	TagBox,
}
