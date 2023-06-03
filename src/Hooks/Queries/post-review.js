import { useMutation, useQueryClient } from '@tanstack/react-query'
import ReviewApi from '../../Apis/reviewApi'
import QUERY_KEY from '../../Consts/query.key'

export const usePostReview = () => {
	const queryClient = useQueryClient()
	return useMutation(
		({ payList_idx, newReview }) =>
			ReviewApi.postNewReview({ payList_idx, newReview }),

		{
			onSuccess: async () => {
				const url = new URL(window.location.href)
				const page = url.searchParams.get('page') || 1
				//queryClient.refetchQueries() 는 프로미스를 반환한다.
				await queryClient.refetchQueries([QUERY_KEY.GET_REVIEW_LIST_DATA, page])
			},
			onError: err => {
				throw new Error(err)
			},
		},
	)
}
