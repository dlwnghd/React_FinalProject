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
}
export default ReviewApi
