import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import ProductApi from '../../Apis/productApi'

const getQuoteInfo = async ({ keyword, start, end }) => {
	const res = await ProductApi.readQuoteList(keyword, start, end)
	return res.data
}

const useGetQuoteProductList = ({ keyword, start, end }) => {
	const { data, error, status, isLoading } = useQuery(
		[QUERY_KEY.GET_QUOTE_PRODUCT_LIST, { keyword, start, end }],
		() => getQuoteInfo({ keyword, start, end }),
		{
			// cacheTime: 1000 * 60 * 5, // 5분
			// onSuccess: () => {},
			// onError: () => {},
		},
	)
	return { data, error, status, isLoading }
}

export default useGetQuoteProductList
