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
