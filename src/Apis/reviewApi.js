import axiosInstance from './@core'

const PATH = '/api/review'

const ReviewApi = {
	getList({ page }) {
		return axiosInstance.get(PATH, { params: { page } })
	},
}
export default ReviewApi
