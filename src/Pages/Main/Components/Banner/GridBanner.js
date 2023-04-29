import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import { useEffect, useRef, useState } from 'react'
import { Arrow_Icon } from '../../../../Components/Icons/Icons'

function GridBanner() {
	const [currentX, setCurrentX] = useState(0)
	const slider = useRef(null)

	const nextSlide = () => {
		if (currentX < productsMock.slice(0, 4).length - 1) {
			setCurrentX(currentX + 1)
			console.log(currentX)
		}
	}

	const prevSlide = () => {
		if (currentX > 0) {
			setCurrentX(currentX - 1)
		}
	}

	useEffect(() => {
		slider.current.style.transform = `translateX(-${currentX}00%)`
	}, [currentX])

	const [startX, setStartX] = useState(0)
	const [endX, setEndX] = useState(0)

	const onTouchStart = e => {
		setStartX(e.touches[0].clientX)
	}
	const onTouchMove = e => {
		setEndX(e.touches[0].clientX)
	}
	const onTouchEnd = () => {
		if (endX > startX) {
			prevSlide()
		}

		if (startX > endX) {
			nextSlide()
		}
	}

	return (
		<S.Wrapper>
			<S.Title>최근 등록 상품</S.Title>
			<S.SlideContainer>
				<S.SlideList
					ref={slider}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					// onMouseDown={onMouseDown}
					// onMouseMove={onMouseMove}
					// onMouseLeave={onMouseLeave}
				>
					{productsMock.slice(0, 4).map((item, idx) => {
						return (
							<S.SlideBox key={idx}>
								{/* createdAt을 기준으로 sort */}
								{productsMock.slice(0, 6).map((item, idx) => {
									return (
										<S.SlideItem
											key={idx}
											recentIMG={`${item.image_url}`}
										></S.SlideItem>
									)
								})}
							</S.SlideBox>
						)
					})}
				</S.SlideList>
				<S.ButtonBox>
					<button className="prev" onClick={prevSlide}>
						<Arrow_Icon size="15" />
					</button>
					<button className="next" onClick={nextSlide}>
						<Arrow_Icon size="15" />
					</button>
				</S.ButtonBox>
			</S.SlideContainer>
		</S.Wrapper>
	)
}

export default GridBanner

const Wrapper = styled.section`
	overflow: hidden;
`

const Title = styled.h3`
	text-align: center;
`

const SlideContainer = styled.div`
	position: relative;
	margin-top: 4rem;
`

const SlideList = styled.div`
	${GridCenterCSS}
	grid-auto-flow: column;
	grid-auto-columns: 100%;
	transition: 0.5s ease-in-out;
`

const SlideBox = styled.ul`
	${GridCenterCSS}
	${ColumnNumberCSS(6)}
    box-sizing: border-box;

	& > li {
		width: 17.4rem;
		height: 17.4rem;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(3)}
	}
`

const SlideItem = styled.li`
	cursor: pointer;
	background: ${({ recentIMG }) => `url(${recentIMG})`} no-repeat center center;
	background-size: cover;
`

const ButtonBox = styled.div`
	& > button {
		position: absolute;
		cursor: pointer;
		top: 50%;
		transform: translateY(-50%);
		width: 3rem;
		height: 6rem;
		border: none;
		box-sizing: border-box;
		background: ${({ theme }) => theme.COLOR.common.white};
		${FlexCenterCSS}
	}

	& > .prev {
		left: 0;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;

		& > svg {
			transform: rotate(180deg);
		}
	}

	& > .next {
		right: 0;
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
	}
`

const S = {
	Wrapper,
	Title,
	SlideContainer,
	SlideList,
	SlideBox,
	SlideItem,
	ButtonBox,
}
