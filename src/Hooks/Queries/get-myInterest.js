import { useQuery } from '@tanstack/react-query'
import MyPageApi from '../../Apis/mypageApi'
import QUERY_KEY from '../../Consts/query.key'

const getMyInterest = async () => {
	const { data } = await MyPageApi.likeProduct()
	return data
}

const useGetMyInterest = () => {
	const { data, error, status, isLoading, isError } = useQuery(
		[QUERY_KEY.GET_MYINTEREST],
		() => getMyInterest(),
		{
			cacheTime: 1000 * 5 * 60,
		},
	)

	return { data, error, status, isLoading, isError }
}

export default useGetMyInterest
