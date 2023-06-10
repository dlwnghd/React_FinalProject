import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

export const slide = (products, key) => {
	const [currentIdx, setCurrentIdx] = useState(0)
	let startX = 0
	let endX = 0
	const slider = useRef(null)

	// 슬라이딩 거리 제어
	const onMove = () => {
		const isMoved = endX - startX

		if (isMoved > 100) {
			prevSlide()
		}

		if (isMoved < -100) {
			nextSlide()
		}
	}

	// current 인덱스 상태관리
	const nextSlide = () => {
		if (currentIdx < products.length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}
	const prevSlide = () => {
		if (currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}
	}

	// 터치 및 마우스 clientX 상태관리
	const onTouchStart = e => {
		startX = e.changedTouches[0].clientX
	}
	const onTouchMove = e => {
		endX = e.changedTouches[0].clientX
	}
	const onTouchEnd = () => {
		onMove()
	}

	const onMouseDown = e => {
		startX = e.clientX
	}
	const onMouseMove = e => {
		endX = e.clientX
	}
	const onMouseUp = () => {
		onMove()
	}

	useEffect(() => {
		slider.current.style.transform = `translateX(-${currentIdx}00%)`
	}, [currentIdx])

	useEffect(() => {
		if (key) {
			// 코드 PR때 함께 리뷰해보고 싶은 내용
			// cloneNode()를 통해 슬라이드박스를 2배로 복사
			// 마지막 슬라이드박스에서 복사된 첫번째 슬라이드박스에 도달했을 때,
			// currentIdx를 0으로 보내면서 transition값을 제거한다.

			const slideInterval = setInterval(() => {
				if (currentIdx < products.length - 1) {
					setCurrentIdx(currentIdx + 1)
				}

				if (currentIdx === products.length - 1) {
					setCurrentIdx(0)
				}
			}, 2400)

			return () => clearInterval(slideInterval)
		}
	}, [currentIdx])

	return {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		slider,
		currentIdx,
		nextSlide,
		prevSlide,
	}
}
