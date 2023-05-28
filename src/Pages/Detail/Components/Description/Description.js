import styled from 'styled-components'

import { useNavigate } from 'react-router'
import {
	ColumnNumberCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../../Styles/common'
import Button from '../../../../Components/Button/Button'
import TagsItem from '../../../../Components/TagItem/TagsItem'
import Heart from '../../../../Components/Heart/Heart'

function Description({ detailProduct, detailIsLoading, detailStatus, liked }) {
	if (detailIsLoading && detailStatus === 'loading') return
	const {
		title,
		idx,
		status,
		price,
		createdAt,
		category,
		description,
		ProductsTags,
	} = detailProduct.searchProduct

	const navigate = useNavigate()

	const createdDay = new Date(createdAt)
	const year = createdDay.getFullYear()
	const month = createdDay.getMonth() + 1
	const day = createdDay.getDate()

	const heartProps = {
		like: liked,
		prod_idx: idx,
		change_size: '24',
	}

	return (
		<S.Wrapper>
			<S.TitleContainer>
				<div>
					<div>
						<h3>{title}</h3>
						<div>
							<p>{status}</p>
							<S.StyledSubButton
								onClick={() => navigate('/recent-price', { state: title })}
							>
								시세보기
							</S.StyledSubButton>
						</div>
					</div>
					<p>
						등록일 : {year}년 {month}월 {day}일
					</p>
				</div>
				<h2>{price === 0 ? '무료' : `${price.toLocaleString()}원`}</h2>
			</S.TitleContainer>
			<S.OptionContainer>
				<S.ButtonBox>
					<S.StyledMainButton
						variant={'no-border'}
						shape={'soft'}
						size={'full'}
					>
						<p>찜</p>
						<Heart {...heartProps} />
					</S.StyledMainButton>
					<S.StyledMainButton
						variant={'no-border'}
						shape={'soft'}
						size={'full'}
					>
						채팅
					</S.StyledMainButton>
				</S.ButtonBox>
			</S.OptionContainer>
			<hr />
			<S.DescriptionContainer>
				<div>
					<h4>카테고리 : {category === 0 ? '중고거래' : '무료나눔'}</h4>
					<p>{description}</p>
				</div>
				<S.TagBox>
					<>
						{ProductsTags.map((item, idx) => {
							return (
								<TagsItem
									key={idx}
									onClick={() => navigate(`/search/${item.Tag.tag}`)}
									size={'default'}
									shape={'round'}
									color={'default'}
								>
									<p>#{item.Tag.tag}</p>
								</TagsItem>
							)
						})}
					</>
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
		margin-bottom: 2rem;

		& > div {
			margin-bottom: 1rem;
		}
	}

	& > div > div {
		${FlexBetweenCSS}
	}

	& > div > div > div {
		${FlexCenterCSS}
	}

	& > div > div > div > p:first-of-type {
		margin-right: 1rem;
	}
`

const DescriptionContainer = styled.div`
	width: 100%;

	& > div {
		margin-bottom: 3rem;
	}
	& > div > h4 {
		margin-bottom: 1rem;
	}
`

const OptionContainer = styled.div`
	width: 100%;
	${FlexBetweenCSS}
`

const TagBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(3)}
	gap:1rem;
`

const ButtonBox = styled.div`
	${FlexBetweenCSS}
	width:100%;
	column-gap: 1rem;
`

const StyledSubButton = styled(Button)`
	width: 10rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	height: 3.2rem;
`

const StyledMainButton = styled(Button)`
	&:first-of-type {
		background: ${({ theme }) => theme.COLOR.common.white};
		color: ${({ theme }) => theme.COLOR.error};
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);

		& > p {
			font-size: 2rem;
			margin-right: 0.3rem;
		}
	}

	${FlexCenterCSS}
	background: ${({ theme }) => theme.COLOR.common.black};
	color: ${({ theme }) => theme.COLOR.main};
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
	ButtonBox,
	StyledMainButton,
	StyledSubButton,
	TagBox,
}
