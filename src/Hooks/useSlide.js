import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

export const slide = products => {
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
