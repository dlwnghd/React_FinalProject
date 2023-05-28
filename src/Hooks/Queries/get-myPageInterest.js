import { useQuery } from '@tanstack/react-query'
import MyPageApi from '../../Apis/mypageApi'
import QUERY_KEY from '../../Consts/query.key'

const getMyPageInterestData = async page => {
	const res = await MyPageApi.likeProduct(page)
	return res.data
}

const useGetMyPageInterestData = page => {
	const { data, status, error, isLoading } = useQuery(
		[QUERY_KEY.GET_LIKED_DATA, page],
		() => getMyPageInterestData({ page: page }),
		{},
	)
	return { data, status, error, isLoading }
}

export default useGetMyPageInterestData
