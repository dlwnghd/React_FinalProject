import { useInfiniteQuery } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

const getSearchData = async params => {
	const res = await ProductApi.searchList(params)
	return res.data
}

const useGetSearchResultData = word => {
	const {
		data,
		status,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		[QUERY_KEY.GET_SEARCHPAGE_DATA, word],
		({ pageParam = 1 }) => getSearchData({ keyword: word, page: pageParam }),
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
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	}
}

export default useGetSearchResultData
