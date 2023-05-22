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
	readProductList(page, category = 0) {
		return axiosInstance.get(`${PATH}/search`, {
			params: { page, category, keyword: '' },
		})
	},
}

export default ProductApi
