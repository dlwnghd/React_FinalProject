import styled from 'styled-components'
import {
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../../../../Components/Icons/Icons'
import { useNavigate } from 'react-router'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
} from '../../../../Styles/common'
import Button from '../../../../Components/Button/Button'

function Description({ detailProduct, detailIsLoading, detailStatus }) {
	if (detailIsLoading && detailStatus === 'loading') return

	const { title, status, price, liked, category, description, ProductsTags } =
		detailProduct.searchProduct
	const navigate = useNavigate()

	return (
		<S.Wrapper>
			<S.TitleContainer>
				<div>
					<h3>{title}</h3>
					<p>{status}</p>
				</div>
				<h2>{price.toLocaleString()}원</h2>
			</S.TitleContainer>
			<S.OptionContainer>
				<S.HeartBox>
					<p>찜</p>
					{liked ? (
						<FillHeart_Icon size="30" />
					) : (
						<NotFillHeart_Icon size="30" />
					)}
				</S.HeartBox>
				<S.ButtonBox>
					<S.StyledButton variant={'no-border'} shape={'soft'} size={'full'}>
						채팅
					</S.StyledButton>
				</S.ButtonBox>
			</S.OptionContainer>
			<hr />
			<S.DescriptionContainer>
				<div>
					<h4>{category === 0 ? '중고거래' : '무료나눔'}</h4>
					<p>{description}</p>
				</div>
				<S.TagBox>
					{ProductsTags.map((item, idx) => {
						return (
							<S.TagItem
								key={idx}
								onClick={() => navigate(`/search/${item.Tag.tag}`)}
							>
								<p>#{item.Tag.tag}</p>
							</S.TagItem>
						)
					})}
				</S.TagBox>
			</S.DescriptionContainer>
		</S.Wrapper>
	)
}

export default Description

const Wrapper = styled.section`
	width: 100%;
	height: 100%;
	padding: 2rem 2rem 0;
	${FlexCenterCSS}
	justify-content: flex-start;
	flex-direction: column;
	align-items: flex-start;

	& > hr {
		width: 100%;
		height: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[300]};
		margin: 4rem 0;
	}
`

const TitleContainer = styled.div`
	width: 100%;
	margin-bottom: 3rem;

	& > div {
		${FlexBetweenCSS}
		margin-bottom:2rem;
	}
`

const DescriptionContainer = styled.div`
	& > div {
		margin-bottom: 3rem;
	}
	& > div > h4 {
		margin-bottom: 1rem;
	}
`

const OptionContainer = styled.div`
	width: 100%;

	${FlexCenterCSS}
`

const HeartBox = styled.div`
	${FlexAlignCSS}
	margin-right:1rem;
	cursor: pointer;

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

const TagItem = styled.li`
	cursor: pointer;
	padding: 0.5rem 2rem;
	border-radius: 2rem;
	margin-right: 1rem;
	background: ${({ theme }) => theme.COLOR.common.gray[100]};
	color: ${({ theme }) => theme.COLOR.common.black};

	&:last-of-type {
		margin-right: 0;
	}
`

const ButtonBox = styled.div`
	${FlexBetweenCSS}
	width:100%;
`

const StyledButton = styled(Button)`
	background: ${({ theme }) => theme.COLOR.common.black};
	color: ${({ theme }) => theme.COLOR.common.white};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	height: 6rem;
	border: none;
	box-sizing: border-box;
`

const S = {
	Wrapper,
	TitleContainer,
	DescriptionContainer,
	OptionContainer,
	HeartBox,
	ButtonBox,
	StyledButton,
	TagBox,
	TagItem,
}
