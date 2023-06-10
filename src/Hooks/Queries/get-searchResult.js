import { useInfiniteQuery } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

const getSearchData = async params => {
	const res = await ProductApi.searchList(params)
	return res.data
}

const useGetSearchResultData = (word, { order, sort }) => {
	const {
		data,
		status,
		error,
		isSuccess,
		refetch,
		fetchNextPage,
		isFetching,
		hasNextPage,
	} = useInfiniteQuery(
		[QUERY_KEY.GET_SEARCHPAGE_DATA],
		({ pageParam = 1 }) =>
			getSearchData({
				status: '판매중',
				keyword: word,
				page: pageParam,
				order,
				sort,
			}),
		{
			// lastPage : 현재 보고있는 마지막 페이지
			// allPages : 현재 pages 데이터(배열)에 담긴 총량
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
		refetch,
		fetchNextPage,
		isFetching,
		hasNextPage,
	}
}

export default useGetSearchResultData
