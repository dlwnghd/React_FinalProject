import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const slide = products => {
	const [currentIdx, setCurrentIdx] = useState(0)
	const [startX, setStartX] = useState(0)
	const [endX, setEndX] = useState(0)
	const slider = useRef(null)

	const onMove = () => {
		const isMoved = endX - startX

		if (isMoved > 100 && currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}

		if (isMoved < -100 && currentIdx < products.length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}

	const onTouchStart = e => {
		setStartX(e.touches[0].clientX)
	}
	const onTouchMove = e => {
		setEndX(e.touches[0].clientX)
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
	const onMouseUp = e => {
		e.preventDefault()
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
	}
}
