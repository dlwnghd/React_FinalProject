const recentPriceMock = {
	data: [],
	avgPrice: {},
}

const end = new Date() // today's date
end.setHours(0)
end.setMinutes(0)
end.setSeconds(0)

const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate()) // one year from today

const items = ['마우스', '노트북', '키보드']

let totalAmount = 0
items.forEach(item => {
	for (
		let date = new Date(start);
		date < end;
		date.setDate(date.getDate() + 1)
	) {
		const newDate = new Date(date) // make a copy of date object
		newDate.setHours(9)
		newDate.setMinutes(0)
		newDate.setSeconds(0)
		const amount = Math.floor(Math.random() * 10001) + 70000 // random amount between 70,000 and 79,999 won
		totalAmount += amount
		recentPriceMock.data.push({
			name: item,
			x: newDate,
			y: amount,
		})
	}
	recentPriceMock.avgPrice[item] = Math.floor(
		totalAmount / recentPriceMock.data.length,
	)
})

export default recentPriceMock

