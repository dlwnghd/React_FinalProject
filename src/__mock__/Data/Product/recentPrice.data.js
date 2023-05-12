const recentPriceMock = []

const end = new Date() // today's date
const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate()) // one year from today

for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
	const amount = Math.floor(Math.random() * 90000) + 10000 // random amount between 10,000 and 99,999 won
	recentPriceMock.push({
		name: '노트북',
		x: new Date(date),
		y: amount,
	})
}

export default recentPriceMock
