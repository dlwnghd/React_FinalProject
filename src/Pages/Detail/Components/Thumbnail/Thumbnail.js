import { useState } from 'react'
import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexAlignCSS,
	GridCenterCSS,
} from '../../../../Styles/common'

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
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	align-items: flex-start;
	column-gap: 0.5rem;
	row-gap: 0.5rem !important;
	width: 100%;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${ColumnNumberCSS(1)}
	}
`
const MainIMGContainer = styled.div`
	width: 48rem;
	height: 48rem;
	background: ${({ images }) => `url(${images})`} no-repeat center center;
	background-size: cover;

	/* @media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 36rem;
		height: 36rem;
	} */
`
const SubIMGContainer = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(1)}
	row-gap: 0.5rem !important;
	column-gap: 0.5rem !important;

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
	background: ${({ images }) => `url(${images})`} no-repeat center center;
	background-size: cover;
	:hover {
		cursor: pointer;
	}

	/* @media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 8rem;
		height: 8rem;
	} */
`

const S = {
	Wrapper,
	MainIMGContainer,
	SubIMGContainer,
	SubImages,
}
