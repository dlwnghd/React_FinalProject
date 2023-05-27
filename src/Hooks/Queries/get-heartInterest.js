import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

const getHeartInterestData = async prod_idx => {
	const res = await ProductApi.interest(prod_idx)
	return res.data
}

const useGetHeartInterestData = (idx, isLiked) => {
	const { data, status, isLoading, error, refetch } = useQuery(
		[QUERY_KEY.GET_DETAIL_INTEREST_DATA, isLiked],
		() => getHeartInterestData({ prod_idx: idx }),
		{},
	)
	return { data, status, isLoading, error, refetch }
}

export default useGetHeartInterestData
