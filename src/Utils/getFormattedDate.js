const getFormattedDate = (date, options = {}) => {
	// 일까지 반환하고 싶다면
	// getFormattedDate(date, { day: true })을 호출하시면 됩니다.
	// 만약 day에 원하는 숫자가 있다면 {day: 1}로 호출하시면 됩니다.
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	let formattedDate = `${year}-${month}`

	if (options.day) {
		const day =
			options.day !== true
				? String(options.day).padStart(2, '0')
				: String(date.getDate()).padStart(2, '0')
		formattedDate += `-${day}`
	}

	return formattedDate
}

export default getFormattedDate
