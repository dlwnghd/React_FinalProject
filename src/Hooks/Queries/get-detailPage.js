import { useQuery } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

const getDetailData = async idx => {
	const res = await ProductApi.detail(idx)
	return res.data
}

const useGetDetailData = idx => {
	const { data, error, status, isLoading } = useQuery(
		[QUERY_KEY.GET_DETAILPAGE_DATA + idx],
		() => getDetailData({ prod_idx: idx }),
		{},
	)
	return { data, error, status, isLoading }
}

export default useGetDetailData
