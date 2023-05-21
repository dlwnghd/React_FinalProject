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
	editProduct(registerList) {
		return axiosInstance.patch(PATH, registerList, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	detail({ prod_idx }) {
		return axiosInstance.get(PATH + '/detail', {
			params: { prod_idx },
		})
	},
	delete(prod_idx) {
		return axiosInstance.delete(PATH, {
			params: { prod_idx },
		})
	},
}

export default ProductApi
