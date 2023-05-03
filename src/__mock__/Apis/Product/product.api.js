import { rest } from 'msw'
import productsMock from '../../Data/Product/product.data'

export const getProducts = rest.get('/api/products', async (req, res, ctx) => {
	const page = req.url.searchParams.get('page') || 1
	const pageSize = req.url.searchParams.get('pageSize')

	const sliceProducts = productsMock.slice(
		(page - 1) * 10,
		(page - 1) * 10 + Number(pageSize),
	)

	return res(ctx.status(200), ctx.json(sliceProducts))
})

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
