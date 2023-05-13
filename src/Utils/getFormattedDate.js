const getFormattedDate = (date, options = {}) => {
	const year = date.getFullYear()
	let month = date.getMonth() + 1

	if (month < 10) {
		month = `0${month}`
	}

	let formattedDate = `${year}-${month}`

	if (options.day) {
		let day = options.day
		if (day < 10) {
			day = `0${day}`
		}
		formattedDate += `-${day}`
	}

	return formattedDate
}

export default getFormattedDate
