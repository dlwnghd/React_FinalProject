import axiosInstance from './@core'

const PATH = '/api/user'

const UserApi = {
	login({ email, pw }) {
		return axiosInstance.post(PATH + '/login', { email, pw })
	},
	signup({ email, pw, nickName, phone, region }) {
		return axiosInstance.post(PATH, { email, pw, nickName, phone, region })
	},
	checkEmail({ email }) {
		return axiosInstance.get(PATH + '/check/email', { params: { email } })
	},
	checkNickname({ nickname }) {
		return axiosInstance.get(PATH + '/check/nickname', {
			params: { re: nickname },
		})
	},
	logout() {
		return axiosInstance.get(PATH + '/logout')
	},
	refreshToken() {
		return axiosInstance.get(PATH + '/refreshToken')
	},
}

export default UserApi
