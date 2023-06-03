import QUERY_KEY from '../../Consts/query.key'
import MyPageApi from '../../Apis/mypageApi'
import { useQuery } from '@tanstack/react-query'

const getMyPagePrdRegisterData = async (page, category) => {
	const res = await MyPageApi.productList({
		page,
		category,
	})
	return res.data
}

const useGetMyPagePrdRegisterData = (page, category) => {
	const { data, error, status, isLoading, isError, refetch } = useQuery(
		[QUERY_KEY.GET_MYPAGE_REGISTER_DATA, category],
		() => getMyPagePrdRegisterData(page, category),
	)
	return { data, error, status, isLoading, isError, refetch }
}
export default useGetMyPagePrdRegisterData
