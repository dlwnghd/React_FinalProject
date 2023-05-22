import { useState } from 'react'
import styled from 'styled-components'
import { FlexAlignCSS, FlexCenterCSS } from '../../../../Styles/common'

function Thumbnail({ productImages }) {
	const [mainImage, setMainImages] = useState(productImages[0].imgUrl)

	const onClickMainImage = url => {
		setMainImages(url)
	}

	return (
		<S.Wrapper>
			<S.MainIMGContainer images={mainImage}></S.MainIMGContainer>
			<S.SubIMGContainer>
				{productImages.map((item, idx) => {
					return (
						<S.SubImages
							images={item.imgUrl}
							key={idx}
							onClick={() => onClickMainImage(item.imgUrl)}
						/>
					)
				})}
			</S.SubIMGContainer>
		</S.Wrapper>
	)
}

export default Thumbnail

const Wrapper = styled.section`
	width: 100%;
	${FlexCenterCSS}
	flex-direction: column;
	align-items: flex-start;
`

const MainIMGContainer = styled.div`
	position: relative;
	width: 100%;

	background: ${({ images }) => `url(${images})`} no-repeat center center;
	background-size: cover;
	margin-bottom: 3rem;

	&::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`
const SubIMGContainer = styled.div`
	${FlexCenterCSS}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${FlexAlignCSS}
		width:100%;
		justify-items: start;
		text-align: left !important;
	}
`
const SubImages = styled.div`
	width: 10rem;
	height: 10rem;
	margin-right: 1rem;
	background: ${({ images }) => `url(${images})`} no-repeat center center;
	background-size: cover;
	:hover {
		cursor: pointer;
	}
`

const S = {
	Wrapper,
	MainIMGContainer,
	SubIMGContainer,
	SubImages,
}
