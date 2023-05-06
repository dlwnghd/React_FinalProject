const recentPriceMock = []

for (
	let d = new Date('2022-02-01');
	d <= new Date();
	d.setDate(d.getDate() + 1)
) {
	recentPriceMock.push({
		x: new Date(d),
		y: Math.floor(Math.random() * 90000) + 10000,
	})
}

export default recentPriceMock