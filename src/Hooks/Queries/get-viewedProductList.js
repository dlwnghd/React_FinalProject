import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import ProductApi from '../../Apis/productApi'

const getViewedProductsInfo = async () => {
	const res = await ProductApi.readViewedList()
	return res.data
}

const useGetViewedProductsList = () => {
	const { data, error, status, isLoading, isError, refetch } = useQuery(
		[QUERY_KEY.GET_VIEWED_PRODUCT_LIST],
		() => getViewedProductsInfo(),
		{
			cacheTime: 1000 * 60 * 5,
		},
	)
	return { data, error, status, isLoading, isError, refetch }
}

export default useGetViewedProductsList
