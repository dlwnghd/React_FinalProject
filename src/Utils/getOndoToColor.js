const getOndoToColor = value => {
	let r, g, b

	if (value < 50) {
		// 최소값: 부드러운 파란색 (100, 150, 255)
		// 중간값: 부드러운 초록색 (100, 255, 150)
		r = 100 + Math.round((value / 50) * (100 - 100))
		g = 150 + Math.round((value / 50) * (255 - 150))
		b = 255 - Math.round((value / 50) * (255 - 150))
	} else {
		// 중간값: 부드러운 초록색 (100, 255, 150)
		// 최대값: 가까운 빨간색220, 110, 110)
		r = 100 + Math.round(((value - 50) / 20) * (220 - 100))
		g = 255 - Math.round(((value - 50) / 20) * (255 - 110))
		b = 150 - Math.round(((value - 50) / 20) * (150 - 110))
	}
	return `rgba(${r}, ${g}, ${b}, 1)`
}

export default getOndoToColor
