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
	readProductList(page = 1, category = 0) {
		return axiosInstance.get(`${PATH}/search`, {
			params: { page, category, keyword: '', status: '판매중' },
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
	like(prod_idx) {
		return axiosInstance.post(PATH + '/like', { prod_idx })
	},
	searchList({ keyword, page }) {
		return axiosInstance.get(PATH + '/search', { params: { keyword, page } })
	},
}

export default ProductApi
