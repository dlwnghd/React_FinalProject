import { useInfiniteQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import ProductApi from '../../Apis/productApi'

const getProductsInfo = async ({ page, category }) => {
	const res = await ProductApi.readProductList(page, category)
	return res.data
}

const useGetProductList = ({ category }) => {
	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			[QUERY_KEY.GET_PRODUCT_LIST, { category }],
			({ pageParam = 1 }) => getProductsInfo({ page: pageParam, category }),
			{
				getNextPageParam: (lastPage, allPages) => {
					const nextPage = allPages.length + 1
					const totalPage = lastPage.pagination.totalPage

					return nextPage > totalPage ? undefined : nextPage
				},
			},
		)
	return { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage }
}

export default useGetProductList
