import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

const getMainPageData = async () => {
	const res = await ProductApi.confirm()
	return res.data
}

const useGetMainPageData = () => {
	const {
		data: mainProduct,
		error,
		status,
		isLoading,
		refetch,
	} = useQuery([QUERY_KEY.GET_MAINPAGE_MAIN_DATA], () => getMainPageData(), {})

	return { data: mainProduct, error, status, isLoading, refetch }
}

export default useGetMainPageData
