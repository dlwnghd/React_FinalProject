import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

const getMainPageMainData = async () => {
	const res = await ProductApi.confirm()
	return res.data
}

const useGetMainPageMainData = () => {
	const { data, error, status, isLoading } = useQuery(
		[QUERY_KEY.GET_MAINPAGE_MAIN_DATA],
		() => getMainPageMainData(),
		{},
	)

	return { data, error, status, isLoading }
}

export default useGetMainPageMainData
