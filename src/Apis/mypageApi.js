import axiosInstance from './@core'

const PATH = '/api/user/my-page'

//내 등록 물품 리스트
//https://topdragon.co.kr/api/user/my-page/product-list&page=1?category=1
// /api/user/my-page/product-list&page={page}?category={category}
///api/user/my-page/product-list&page={page}?category={category}

const MypageApi = {
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
}

export default MypageApi
