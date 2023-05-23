const bankMock = {
	amount: {
		totalSaleAmount: '50000', // 총 판매 금액
		totalPurchaseAmount: '30000', // 총 구매 금액
		thisMonthSaleAmount: '3000', // 이번 달 판매 금액
		thisMonthPurchaseAmount: '5000', // 이번 달 구매 금액
	},
	payList: [],
	count: 0,
}
// 2023년 5월 데이터
for (let i = 0; i < 20; i++) {
	bankMock.payList.push({
		idx: Math.floor(Math.random() * 100000),
		createdAt: '2023-05-22',
		product: {
			idx: Math.floor(Math.random() * 100000),
			createdAt: '2023-05-21',
			price: 4000,
			img_url:
				'https://product-image.kurly.com/product/image/9841e982-6ea5-4c55-a769-36366f5f3d2a.jpg',
		},
	})
}
// 2023년 4월 데이터
for (let i = 0; i < 5; i++) {
	bankMock.payList.push({
		idx: Math.floor(Math.random() * 100000),
		createdAt: '2023-04-22',
		product: {
			idx: Math.floor(Math.random() * 100000),
			createdAt: '2023-05-21',
			price: 4000,
			img_url:
				'https://product-image.kurly.com/product/image/9841e982-6ea5-4c55-a769-36366f5f3d2a.jpg',
		},
	})
}
// 2023년 3월 데이터
for (let i = 0; i < 30; i++) {
	bankMock.payList.push({
		idx: Math.floor(Math.random() * 100000),
		createdAt: '2023-03-22',
		product: {
			idx: Math.floor(Math.random() * 100000),
			createdAt: '2023-05-21',
			price: 4000,
			img_url:
				'https://product-image.kurly.com/product/image/9841e982-6ea5-4c55-a769-36366f5f3d2a.jpg',
		},
	})
}
// 2023년 2월 데이터
for (let i = 0; i < 200; i++) {
	bankMock.payList.push({
		idx: Math.floor(Math.random() * 100000),
		createdAt: '2023-02-22',
		product: {
			idx: Math.floor(Math.random() * 100000),
			createdAt: '2023-05-21',
			price: 4000,
			img_url: 'https://img-cf.kurly.com/shop/data/goods/1652772661272l0.jpg',
		},
	})
}

bankMock.count = bankMock.payList.length

export default bankMock
