import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'

const usePostHeart = (prod_idx, getMessage) => {
	const { mutateAsync, isLoading } = useMutation(
		() => ProductApi.like(prod_idx),
		{
			onSuccess: res => {
				const { message } = res.data
				getMessage(message)
			},
			onError: err => {
				console.log(err)
			},
		},
	)
	return { mutateAsync, isLoading }
}

export default usePostHeart
