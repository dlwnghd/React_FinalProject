import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const slide = products => {
	const [currentIdx, setCurrentIdx] = useState(0)
	const [startX, setStartX] = useState(0)
	const [endX, setEndX] = useState(0)
	const slider = useRef(null)

	// 슬라이딩 거리 제어
	const onMove = () => {
		const isMoved = endX - startX

		if (isMoved > 100 && currentIdx > 0) {
			prevSlide()
		}

		if (isMoved < -100 && currentIdx < products.length - 1) {
			nextSlide()
		}
	}

	// current 인덱스 상태관리
	const nextSlide = () => {
		setCurrentIdx(currentIdx + 1)
	}
	const prevSlide = () => {
		setCurrentIdx(currentIdx - 1)
	}

	// 터치 및 마우스 clientX 상태관리
	const onTouchStart = e => {
		setStartX(e.changedTouches[0].clientX)
	}
	const onTouchMove = e => {
		setEndX(e.changedTouches[0].clientX)
	}
	const onTouchEnd = () => {
		onMove()
	}

	const onMouseDown = e => {
		setStartX(e.clientX)
	}
	const onMouseMove = e => {
		setEndX(e.clientX)
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
		setCurrentIdx,
		nextSlide,
		prevSlide,
	}
}
