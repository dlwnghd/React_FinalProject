import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import ChatApi from '../../Apis/chatApi'

const getProductChatListData = async prod_idx => {
	const res = await ChatApi.prdChatList(prod_idx)
	return res.data
}

const useGetProductChatListData = prod_idx => {
	const { data, status, error, isLoading, refetch } = useQuery(
		[QUERY_KEY.GET_PRODUCT_CHAT_LIST, prod_idx],
		() => getProductChatListData(prod_idx),
		{
			enabled: !!prod_idx,
		},
	)
	return { data, status, error, isLoading, refetch }
}

export default useGetProductChatListData
