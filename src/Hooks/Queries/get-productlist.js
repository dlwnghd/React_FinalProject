import { useInfiniteQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import ProductApi from '../../Apis/productApi'

const getProductsInfo = async params => {
	const res = await ProductApi.readProductList(params)
	return res.data
}

const useGetProductList = ({ category }, { order, sort }) => {
	const {
		data,
		status,
		error,
		isSuccess,
		hasNextPage,
		fetchNextPage,
		isFetching,
		refetch,
	} = useInfiniteQuery(
		[QUERY_KEY.GET_PRODUCT_LIST, { category }],
		({ pageParam = 1 }) =>
			getProductsInfo({ page: pageParam, category, order, sort }),
		{
			getNextPageParam: (lastPage, allPages) => {
				const nextPage = allPages.length + 1
				const totalPage = lastPage.pagination.totalPage

				return nextPage > totalPage ? undefined : nextPage
			},
		},
	)
	return {
		data,
		status,
		error,
		isSuccess,
		hasNextPage,
		fetchNextPage,
		isFetching,
		refetch,
	}
}

export default useGetProductList
