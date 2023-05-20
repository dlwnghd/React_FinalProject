import axiosInstance from './@core'

const PATH = '/api/user/my-page'

const MyPageApi = {
	getMain() {
		return axiosInstance.get(PATH)
	},
	productList({ page, category }) {
		console.log(page, category)
		return axiosInstance.get(PATH + '/product-list', {
			params: { page, category },
		})
	},
	likeProduct({ page }) {
		return axiosInstance.get(PATH + '/like-product-list', {
			params: { page },
		})
	},
}

export default MyPageApi
