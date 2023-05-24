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
	readQuoteList(keyword, start, end) {
		return axiosInstance.get(`${PATH}/quote`, {
			params: { keyword, start, end },
		})
	},
	readViewedList() {
		return axiosInstance.get(`${PATH}/viewed-list`, {})
	},
	addViewedList(prod_idx) {
		return axiosInstance.post(`${PATH}/viewed-list`, { prod_idx })
	},
	deleteViewedList(prod_idx) {
		return axiosInstance.delete(`${PATH}/viewed-list`, {
			params: { prod_idx },
		})
	},
}

export default ProductApi
