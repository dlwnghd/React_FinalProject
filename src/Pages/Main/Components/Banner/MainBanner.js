import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import Pagination from './Components/Pagination'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

function MainBanner() {
	const [currentIdx, setCurrentIdx] = useState(0)
	const [startX, setStartX] = useState(0)
	const [endX, setEndX] = useState(0)
	const slider = useRef()

	const onTouchStart = e => {
		setStartX(e.touches[0].clientX)
	}

	const onTouchMove = e => {
		setEndX(e.touches[0].clientX)
	}

	const onTouchEnd = () => {
		const isMoved = endX - startX

		if (isMoved > 100 && currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}

		if (isMoved < -100 && currentIdx < productsMock.slice(0, 4).length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}

	useEffect(() => {
		slider.current.style.transform = `translateX(-${currentIdx}00%)`
	}, [currentIdx])

	return (
		<S.Wrapper>
			<S.SlideList
				ref={slider}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				{productsMock.slice(0, 4).map((bnr, idx) => {
					return (
						<li key={idx}>
							<p>네모난 고양이</p>
							<h2>{bnr.title}</h2>
							<p>인기 브랜드 총 집합, 내옷나눔</p>
						</li>
					)
				})}
			</S.SlideList>
			<Pagination currentIdx={currentIdx} />
		</S.Wrapper>
	)
}

export default MainBanner

const Wrapper = styled.section`
	position: relative;
	height: 36rem;
	overflow: hidden;
	box-sizing: border-box;
	border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[100]};
`

const SlideList = styled.ul`
	transition: 0.5s ease-in-out;
	${FlexAlignCSS}
	height: 100%;

	& > li {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		padding: 6rem;

		& > h2 {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			margin: 1rem 0 2rem;
		}
	}
`

const S = {
	Wrapper,
	SlideList,
}
