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
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1624267363401l0.jpg',
			},
		],
		ProductsTags: [{ tag: '태그1' }, { tag: '태그2' }, { tag: '태그3' }],
		// createdAt: new Date('2022-04-02T12:35:09.484Z'),
		createdAt: new Date(),
		image_url: 'https://img-cf.kurly.com/shop/data/goods/1649403816159l0.jpg',
		liked: 0,
		price: 0,
		status: '판매중',
		title: '네모난 고양이',
		description: '테스트는 고양이입니다. 고양이의 색깔은 무엇일까요? 하하',
		category: 0,
	},
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
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
		image_url: 'https://img-cf.kurly.com/shop/data/goods/1487317448822l0.jpg',
		liked: 1,
		price: 0,
		status: '판매완료',
		title: '금빛 고양이',
		description:
			'황금색 고양이는 테스트의 한 종류입니다. 금은 별처럼 반짝거립니다. 하하',
		category: 0,
	},
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
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
		image_url: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
		liked: 1,
		price: Math.floor(Math.random() * 100000),
		status: '판매중',
		title: '은빛 고양이',
		description:
			'은색 고양이는 테스트의 한 종류입니다. 은은 다이아몬드처럼 반짝거립니다. 하하',
		category: 1,
	},
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
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
		price: Math.floor(Math.random() * 100000),
		status: '판매중',
		title: '동빛 고양이',
		description:
			'동색 고양이는 테스트의 한 종류입니다. 동은 음... 뭘까요. 하하',
		category: 1,
	},
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
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
		image_url: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
		liked: 1,
		price: 0,
		status: '판매완료',
		title: '은빛 고양이',
		description:
			'은색 고양이는 테스트의 한 종류입니다. 은은 다이아몬드처럼 반짝거립니다. 하하',
		category: 0,
	},
	{
		idx: Math.floor(Math.random() * 10000),
		ProductImages: [
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
			},
			{
				imgUrl: 'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
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
		price: 0,
		status: '판매완료',
		title: '동빛 고양이',
		description:
			'동색 고양이는 테스트의 한 종류입니다. 동은 음... 뭘까요. 하하',
		category: 0,
	},
]

const productsMock = []

for (let i = 0; i < 100; i++) {
	productsMock.push(...dummyProduct)
}

export default productsMock
