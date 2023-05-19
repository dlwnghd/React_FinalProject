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
	delete(prod_idx) {
		return (
			axiosInstance.delete(PATH),
			{
				params: { prod_idx },
			}
		)
	},
	like(prod_idx) {
		return axiosInstance.post(PATH + '/like', prod_idx)
	},
}

export default ProductApi
