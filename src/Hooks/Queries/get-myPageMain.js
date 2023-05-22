import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import MyPageApi from '../../Apis/mypageApi'

const getMyPageMainData = async () => {
	const res = await MyPageApi.getMain()
	return res.data
}

const useGetMyPageMainData = () => {
	const { data, error, status, isLoading, isError } = useQuery(
		[QUERY_KEY.GET_MYPAGE_MAIN_DATA],
		() => getMyPageMainData(),
		{
			cacheTime: 1000 * 60 * 30, // 30분
		},
	)

	return { data, error, status, isLoading, isError }
}
export default useGetMyPageMainData
