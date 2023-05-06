import styled from 'styled-components'
import { useState } from 'react'
import {
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../../../../Components/Icons/Icons'
import { useNavigate } from 'react-router'
import { FlexAlignCSS, FlexBetweenCSS } from '../../../../Styles/common'

function Description({ product }) {
	const { title, price, description, ProductsTags, category, status } = product
	const [like, setLike] = useState(false)
	const navigate = useNavigate()

	const onClick = () => {
		setLike(prev => !prev)
	}
	return (
		<S.Wrapper>
			<S.TitleContainer>
				<div>
					<h3>{title}</h3>
					<p>{status}</p>
				</div>
				<h2>{price}원</h2>
			</S.TitleContainer>
			<S.DescriptionContainer>
				<h4>{category === 0 ? '중고거래' : '무료나눔'}</h4>
				<p>{description}</p>
				<S.TagBox>
					{ProductsTags.map((item, idx) => {
						return (
							<S.TagItem
								key={idx}
								onClick={() => navigate(`/search/${item.Tag}`)}
							>
								<span>#{item.Tag}</span>
							</S.TagItem>
						)
					})}
				</S.TagBox>
			</S.DescriptionContainer>
			<S.OptionContainer>
				<S.HeartBox onClick={onClick}>
					<p>찜</p>
					{like ? (
						<FillHeart_Icon size="30" />
					) : (
						<NotFillHeart_Icon size="30" />
					)}
				</S.HeartBox>

				<S.ButtonBox>
					<button>채팅</button>
					<button>결제</button>
				</S.ButtonBox>
			</S.OptionContainer>
		</S.Wrapper>
	)
}

export default Description

const Wrapper = styled.section`
	width: 100%;
	height: 100%;
	${FlexBetweenCSS}
	flex-direction: column;
	align-items: flex-start;
`

const TitleContainer = styled.div`
	width: 100%;
	padding: 2rem;

	& > div {
		${FlexBetweenCSS}
		margin-bottom:2rem;
	}
`

const DescriptionContainer = styled.div`
	padding: 2rem;
`

const OptionContainer = styled.div`
	width: 100%;
`

const HeartBox = styled.div`
	${FlexAlignCSS}
	margin-bottom:2rem;

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		color: ${({ theme }) => theme.COLOR.main};
	}

	& > svg {
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const TagBox = styled.ul`
	${FlexAlignCSS}
`
const TagItem = styled.li``

const ButtonBox = styled.div`
	${FlexBetweenCSS}

	& > button {
		width: 100%;
		height: 6rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}

	& > button:first-of-type {
		margin-right: 1rem;
	}
`

const S = {
	Wrapper,
	TitleContainer,
	DescriptionContainer,
	OptionContainer,
	HeartBox,
	ButtonBox,
	TagBox,
	TagItem,
}
