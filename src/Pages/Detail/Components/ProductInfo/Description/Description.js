import styled from 'styled-components'
import { useState } from 'react'
import {
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../../../../../Components/Icons/Icons'
function PrdDescription() {
	const [like, setLike] = useState(false)

	const onClickLike = () => {
		setLike(prev => !prev)
	}
	return (
		<S.DescriptionWrapper>
			<S.DetailBox>
				<S.TitleBox>
					<Title>네모난 고양이</Title>
					<SubTitle>별나게 우수운 고양이, 다채로운 컬러</SubTitle>
				</S.TitleBox>
				<S.PriceBox>
					<Price>3,980,000원</Price>
				</S.PriceBox>
				<S.CtaBox>
					<Cta>
						어깨에 걸치는 손잡이와 크로스바디 착용을 위한 벨트형 스트랩 옵션이
						있습니다.행복을 주세요
					</Cta>
				</S.CtaBox>
			</S.DetailBox>
			<S.OptionBox>
				<S.HeartBox onClick={onClickLike}>
					<span>찜</span>
					{like ? <FillHeart_Icon /> : <NotFillHeart_Icon />}
				</S.HeartBox>
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
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	height: 484px;
`
const DetailBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
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
	height: 20rem;
`
const Cta = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`
const OptionBox = styled.div`
	display: flex;
	flex-direction: column;
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
const ButtonBox = styled.div`
	display: flex;
	gap: 1rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		flex-direction: column;
	}
`

const Button = styled.button`
	width: 50%;
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
}
