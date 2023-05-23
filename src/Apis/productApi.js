import axiosInstance from './@core'

const PATH = '/api/product'

const ProductApi = {
	register(registerList) {
		return axiosInstance.post(PATH, registerList, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	confirm() {
		return axiosInstance.get(PATH)
	},
	delete(prod_idx) {
		return (
			axiosInstance.delete(PATH),
			{
				params: { prod_idx },
			}
		)
	},
	interest({ prod_idx }) {
		return axiosInstance.post(PATH + 'like', { prod_idx })
	},
	searchList({ keyword, page }) {
		return axiosInstance.get(PATH + '/search', { params: { keyword, page } })
	},
	detail({ prod_idx }) {
		return axiosInstance.get(PATH + '/detail', { params: { prod_idx } })
	},
}

export default ProductApi
