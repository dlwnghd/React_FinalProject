import { useQuery } from '@tanstack/react-query'
import ReviewApi from '../../Apis/reviewApi'
import QUERY_KEY from '../../Consts/query.key'

const getList = async ({ page }) => {
	const res = await ReviewApi.getList({ page })
	return res.data
}

const useGetReviewList = ({ page }) => {
	const { data, error, status } = useQuery(
		[QUERY_KEY.GET_REVIEW_LIST_DATA, page],
		() => getList({ page }),
		{
			cacheTime: 1000 * 60 * 15, // 15분
			staleTime: 1000 * 60 * 15,
		},
	)
	return { data, error, status }
}
export default useGetReviewList
