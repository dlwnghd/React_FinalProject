import { useState } from 'react'
import styled from 'styled-components'

function PrdThumbnail({ ProductImages }) {
	const [mainImage, setMainImages] = useState(ProductImages[0].imgUrl)

	const onClickMainImage = url => {
		setMainImages(url)
	}

	return (
		<ThumbnailWrapper>
			<MainThumBox images={mainImage}></MainThumBox>
			<SubThumBox>
				{ProductImages.map((item, idx) => {
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
	display: flex;
	flex-direction: row;
	gap: 1rem;

	@media screen and (max-width: 1024px) {
		flex-direction: column;
	}
`
const MainThumBox = styled.div`
	
		width: 480px;
		height: 480px;
		background-image: ${({ images }) => `url(${images})`};
		background-repeat: no-repeat;
		background-size: cover;
		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			width: 390px;
			height: 390px;
		}
	}
`
const SubThumBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media screen and (max-width: 1024px) {
		flex-direction: row;
	}
`
const SubImages = styled.div`
	width: 92px;
	height: 92px;
	background-image: ${({ images }) => `url(${images})`};
	background-repeat: no-repeat;
	background-size: cover;
	:hover {
		cursor: pointer;
	}
`
