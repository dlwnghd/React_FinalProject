import { rest } from 'msw'
import productsMock from '../../Data/Product/product.data'

export const getProducts = rest.get('/api/products', async (req, res, ctx) => {
	const searchFilter = [
		'최근 등록순',
		'인기 높은순',
		'높은 가격순',
		'낮은 가격순',
	]
	const page = req.url.searchParams.get('page') || 1
	const pageSize = req.url.searchParams.get('pageSize') || 10
	const search = req.url.searchParams.get('search') || ''
	const category = req.url.searchParams.get('category') || ''
	const filterOption =
		req.url.searchParams.get('filterOption') || searchFilter[0]
	const status = req.url.searchParams.get('status') || '판매중'

	/*
	돌려줄 리스트에 영향을 미치는 것(6가지)
	1. page			- 현재 페이지 번호
	2. pageSize		- 페이지별 호출할 상품 수
	3. search		- 검색어
	4. category		- (0:무료나눔 1:중고거래)
	5. filterOption	- ('최근 등록순','인기 높은순','높은 가격순','낮은 가격순',)
	6. status		- 판매완료 여부 ('판매중', '판매완료')

	- productsMock을
		- status로 .filter(item => item.status.includes(status))
		- search로 .filter(item => item.title.includes(search))
		- category로 .filter(item => item.category == category)
		- filterOption으로 sort(...) ➡️ 알고리즘이 다 다름
		- page, pageSize로 slice((page - 1) * 10,(page - 1) * 10 Number(pageSize),)
	 */

	console.log('🔴🔴🔴🔴', filterOption === searchFilter[0])
	console.log('🟡🟡🟡🟡', filterOption === searchFilter[1])
	console.log('🟢🟢🟢🟢', filterOption === searchFilter[2])
	console.log('🔵🔵🔵🔵', filterOption === searchFilter[3])
	const sliceProducts = productsMock
		.filter(item => item.status.includes(status))
		.filter(item => item.title.includes(search))
		.filter(item => item.category == category)
		.sort((a, b) => {
			if (filterOption === searchFilter[0]) {
				return new Date(a.createdAt) - new Date(b.createdAt)
			} else if (filterOption === searchFilter[1]) {
				return b.idx - a.idx
			} else if (filterOption === searchFilter[2]) {
				return b.price - a.price
			} else if (filterOption === searchFilter[3]) {
				return a.price - b.price
			}
		})
		.slice((page - 1) * 10, (page - 1) * 10 + Number(pageSize))

	console.log(sliceProducts)
	return res(ctx.status(200), ctx.json(sliceProducts))
})

export const getSearch = rest.get(
	'/api/products/search',
	async (req, res, ctx) => {
		const searchFilter = [
			'최근 등록순',
			'인기 높은순',
			'높은 가격순',
			'낮은 가격순',
		]
		const page = req.url.searchParams.get('page') || 1
		const pageSize = req.url.searchParams.get('pageSize') || 10
		const search = req.url.searchParams.get('search') || ''
		const filterOption =
			req.url.searchParams.get('filterOption') || searchFilter[0]
		const status = req.url.searchParams.get('status') || '판매중'

		const sliceProducts = productsMock
			.filter(item => item.status.includes(status))
			.filter(item => item.title.includes(search))
			.sort((a, b) => {
				if (filterOption === searchFilter[0]) {
					return new Date(a.createdAt) - new Date(b.createdAt)
				} else if (filterOption === searchFilter[1]) {
					return b.idx - a.idx
				} else if (filterOption === searchFilter[2]) {
					return b.price - a.price
				} else if (filterOption === searchFilter[3]) {
					return a.price - b.price
				}
			})
			.slice((page - 1) * 10, (page - 1) * 10 + Number(pageSize))

		return res(ctx.status(200), ctx.json(sliceProducts))
	},
)

export const addProduct = rest.post('/api/product', async (req, res, ctx) => {
	const data = req.body

	const product_images_arr = []
	const products_tag_arr = []

	data.tag.forEach(tag => product_images_arr.append({ tag }))
	data.images.forEach(imgUrl => products_tag_arr.append({ imgUrl }))

	const newData = {
		idx: Math.floor(Math.random() * 10000000),
		ProductImages: product_images_arr,
		ProductsTags: products_tag_arr,
		createdAt: new Date(),
		image_url: data.images[0],
		liked: 0,
		price: parseInt(data.price),
		status: '판매중',
		title: data.title,
		description: data.description,
		category: data.category,
	}

	productsMock.unshift(newData)

	return res(
		ctx.status(200),
		ctx.json({
			SUCCESS: true,
		}),
	)
})
