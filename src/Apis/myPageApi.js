import axiosInstance from './@core'

const PATH = '/api/user/my-page'

const MyPageApi = {
	getMain() {
		return axiosInstance.get(PATH)
	},
	productList({ page, category }) {
		return axiosInstance.get(PATH + '/product-list', {
			params: { page, category },
		})
	},
	likeProduct({ page }) {
		return axiosInstance.get(PATH + '/like-product-list', {
			params: { page },
		})
	},
	getBankList({ page, category, start, end }) {
		return axiosInstance.get(PATH + '/account-book', {
			params: { page, category, start, end },
		})
	},
}

export default MyPageApi
