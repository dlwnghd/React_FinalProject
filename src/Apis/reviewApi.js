import axiosInstance from './@core'

const PATH = '/api/review'

const ReviewApi = {
	getList({ page }) {
		return axiosInstance.get(PATH, { params: { page } })
	},
	postNewReview({ payList_idx, newReview }) {
		return axiosInstance.post(PATH + `?payList_idx=${payList_idx}`, newReview, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	updateReview({ review_idx, newReview }) {
		return axiosInstance.patch(PATH + `?review_idx=${review_idx}`, newReview, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	deleteReview({ review_idx }) {
		console.log({ review_idx })
		return axiosInstance.delete(PATH + `?review_idx=${review_idx}`)
	},
}
export default ReviewApi
