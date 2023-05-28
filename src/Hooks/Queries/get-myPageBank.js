import { useQuery } from '@tanstack/react-query'
import MyPageApi from '../../Apis/mypageApi'
import QUERY_KEY from '../../Consts/query.key'

const getMyPageBankList = async params => {
	const res = await MyPageApi.getBankList(params)
	return res.data
}

const useGetMyPageBankList = ({ page, category, start, end }) => {
	const { data, error, status, refetch } = useQuery(
		[QUERY_KEY.GET_MYPAGE_BANK_LIST, page, category, start, end],
		() => getMyPageBankList({ page, category, start, end }),
		{
			cacheTime: 1000 * 60 * 5, // 5분
			staleTime: 1000 * 60 * 5,
		},
	)
	return { data, error, status, refetch }
}
export default useGetMyPageBankList
