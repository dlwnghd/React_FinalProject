import QUERY_KEY from '../../Consts/query.key'
import MyPageApi from '../../Apis/mypageApi'
import { useQuery } from '@tanstack/react-query'

const getMyPagePrdRegisterData = async () => {
	const res = await MyPageApi.productList({
		page: 1,
		category,
	})
	return res.data
}

const useGetMyPagePrdRegisterData = () => {
	const { data, error, status, isLoading, isError } = useQuery(
		[QUERY_KEY.GET_MYPAGE_REGISTER_DATA],
		() => getMyPagePrdRegisterData(),
		// { staleTime: 1000 * 60 * 5 },
	)
	return { data, error, status, isLoading, isError }
}
export default useGetMyPagePrdRegisterData
