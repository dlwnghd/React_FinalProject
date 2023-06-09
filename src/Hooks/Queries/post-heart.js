// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import ProductApi from '../../Apis/productApi'
// import QUERY_KEY from '../../Consts/query.key'


const usePostHeart = (prod_idx, getMessage) => {
	const queryClient = useQueryClient()
	const { mutateAsync, isLoading } = useMutation(
		() => ProductApi.like(prod_idx),
		{
			onSuccess: async res => {
				await queryClient.invalidateQueries(
					[QUERY_KEY.GET_MAINPAGE_MAIN_DATA],
					[QUERY_KEY.GET_DETAILPAGE_DATA + prod_idx],
				)
				const { message } = res.data
				getMessage(message)
			},
			onError: err => {},
		},
	)
	return { mutateAsync, isLoading }
}

// const usePostHeart = (prod_idx, getMessage, category) => {
// 	const queryClient = useQueryClient()
// 	const { mutateAsync, isLoading } = useMutation(
// 		() => ProductApi.like(prod_idx),
// 		{
// 			onSuccess: async res => {
// 				await queryClient.invalidateQueries(
// 					[QUERY_KEY.GET_MAINPAGE_MAIN_DATA],
// 					[QUERY_KEY.GET_DETAILPAGE_DATA, prod_idx],
// 					[QUERY_KEY.GET_PRODUCT_LIST, { category }],
// 				)
// 				const { message } = res.data
// 				getMessage(message)
// 			},
// 			onError: err => {
// 				console.log(err)
// 			},
// 		},
// 	)
// 	return { mutateAsync, isLoading }
// }


// export default usePostHeart
