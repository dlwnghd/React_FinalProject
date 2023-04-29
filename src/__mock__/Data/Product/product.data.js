const dummyProduct = [
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1487317448822l0.jpg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1649403816159l0.jpg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1624267363401l0.jpg',
			},
		],
		ProductsTags: [{ tag: '태그1' }, { tag: '태그2' }, { tag: '태그3' }],
		createdAt: new Date(),
		image_url: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
		liked: 0,
		price: 100000,
		status: '판매중',
		title: '테스트 판매중입니다.',
	},
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1487317448822l0.jpg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1649403816159l0.jpg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1624267363401l0.jpg',
			},
		],
		ProductsTags: [{ tag: '태그1' }, { tag: '태그2' }, { tag: '태그3' }],
		createdAt: new Date(),
		image_url: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
		liked: 1,
		price: 100000,
		status: '판매완료',
		title: '검색을 해보세요',
	},
]

const productsMock = []

for (let i = 0; i < 200; i++) {
	productsMock.push(...dummyProduct)
}

export default productsMock
