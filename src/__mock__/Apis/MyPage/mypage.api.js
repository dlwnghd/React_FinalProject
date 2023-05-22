import { rest } from 'msw'
import bankMock from '../../Data/MyPage/bank.data'

export const getBankList = rest.get(
	'/api/user/my-page/account-book',
	async (req, res, ctx) => {
		const page = req.url.searchParams.get('page') || 1
		const category = req.url.searchParams.get('category')
		const start = req.url.searchParams.get('start')
		const end = req.url.searchParams.get('end')

		const filteredPayList = bankMock.payList
			.filter(data => data.createdAt >= start && data.createdAt <= end)
			.slice((page - 1) * 10, (page - 1) * 10 + 10)

		const makeData = {
			...bankMock,
			payList: filteredPayList,
		}

		return res(ctx.status(200), ctx.json(makeData))
	},
)
