import { useState } from 'react'
import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../../Styles/common'

function PrdThumbnail({ productImages }) {
	const [mainImage, setMainImages] = useState(productImages[0].imgUrl)

	const onClickMainImage = url => {
		setMainImages(url)
	}

	return (
		<ThumbnailWrapper>
			<MainThumBox images={mainImage}></MainThumBox>
			<SubThumBox>
				{productImages.map((item, idx) => {
					return (
						<SubImages
							images={item.imgUrl}
							key={idx}
							onClick={() => onClickMainImage(item.imgUrl)}
						/>
					)
				})}
			</SubThumBox>
		</ThumbnailWrapper>
	)
}

export default PrdThumbnail

const ThumbnailWrapper = styled.section`
	${GridCenterCSS}
	align-items: flex-start;
	${ColumnNumberCSS(2)}
	column-gap: 0.5rem;
	row-gap: 0.5rem !important;
	width: 100%;
	@media screen and (max-width: 1024px) {
		${ColumnNumberCSS(1)}
	}
`
const MainThumBox = styled.div`
	width: 480px;
	height: 480px;
	background-image: ${({ images }) => `url(${images})`};
	background-repeat: no-repeat;
	background-size: cover;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 360px;
		height: 360px;
	}
`
const SubThumBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(1)}
	row-gap: 0.5rem !important;
	column-gap: 0.5rem !important;
	@media screen and (max-width: 1024px) {
		${ColumnNumberCSS(4)}
		text-align: left !important;
	}
`
const SubImages = styled.div`
	width: 90px;
	height: 90px;
	background-image: ${({ images }) => `url(${images})`};
	background-repeat: no-repeat;
	background-size: cover;
	:hover {
		cursor: pointer;
	}
`
