import { useMutation, useQueryClient } from '@tanstack/react-query'
import ReviewApi from '../../Apis/reviewApi'
import QUERY_KEY from '../../Consts/query.key'

export const useDeleteReview = () => {
	const queryClient = useQueryClient()
	return useMutation(
		({ review_idx }) => ReviewApi.deleteReview({ review_idx }),
		{
			onSuccess: async () => {
				const url = new URL(window.location.href)
				const page = url.searchParams.get('page') || 1
				await queryClient.refetchQueries([QUERY_KEY.GET_REVIEW_LIST_DATA, page])
			},
			onError: err => {
				throw new Error(err)
			},
		},
	)
}
