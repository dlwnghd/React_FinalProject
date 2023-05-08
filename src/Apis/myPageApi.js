import axiosInstance from './@core'

const PATH = '/api/user/my-page'

const MyPageApi = {
	getMain() {
		return axiosInstance.get(PATH)
	},
}
export default MyPageApi
