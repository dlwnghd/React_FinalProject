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
}

export default ProductApi
