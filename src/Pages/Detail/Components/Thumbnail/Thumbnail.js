import { useState } from 'react'
import styled from 'styled-components'
import { FlexAlignCSS, FlexCenterCSS } from '../../../../Styles/common'

function Thumbnail({ detailProduct, detailIsLoading, detailStatus }) {
	if (detailIsLoading && detailStatus === 'loading') return

	const { img_url, ProductImages, status } = detailProduct.searchProduct
	const [mainImage, setMainImages] = useState(img_url)
	const [isSubIMG, setIsSubIMG] = useState(ProductImages)

	const onClickMainImage = it => {
		setMainImages(it.img_url)

		const clickIdx = isSubIMG.indexOf(it)
		const newArray = isSubIMG.filter((it, idx) => {
			return idx !== clickIdx
		})

		newArray.splice(clickIdx, 0, { img_url: mainImage })
		setIsSubIMG(newArray)
	}

	return (
		<S.Wrapper>
			<S.MainIMGContainer>
				{status === '판매완료' && <S.SoldOutCover>SOLD OUT</S.SoldOutCover>}
				<S.MainIMGBox images={mainImage}></S.MainIMGBox>
			</S.MainIMGContainer>
			<S.SubIMGContainer>
				<>
					{isSubIMG.map((item, idx) => {
						return (
							<S.SubImages
								images={item.img_url}
								key={idx}
								onClick={() => onClickMainImage(item)}
							/>
						)
					})}
				</>
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
	box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);
	margin-bottom: 3rem;
`

const MainIMGBox = styled.div`
	background: ${({ images }) => `url(${images})`} no-repeat center center;
	background-size: cover;

	&::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const SoldOutCover = styled.div`
	${FlexCenterCSS}
	position: absolute;
	width: 100%;
	height: 100%;
	background: ${({ theme }) => theme.COLOR.common.black};
	opacity: 0.5;
	font-size: 7.2rem;
	color: ${({ theme }) => theme.COLOR.common.white};
`

const SubIMGContainer = styled.div`
	${FlexCenterCSS}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${FlexAlignCSS}
		width:100%;
		justify-content: start;
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
	MainIMGBox,
	SubIMGContainer,
	SubImages,
	SoldOutCover,
}
