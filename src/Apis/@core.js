import axios from 'axios'
import TokenService from '../Utils/tokenService'
import UserApi from './userApi'
import UserInfoService from '../Utils/userInfoService'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	withCredentials: true,
})

axiosInstance.interceptors.request.use(
	config => {
		const access_token = TokenService.getAccessToken()
		if (access_token) {
			config.headers.Authorization = `bearer ${access_token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	async error => {
		const originalRequest = error.config

		if (error.message === 'Network Error') {
			return Promise.reject(error)
		}

		if (error.response.status === 417 && !originalRequest._retry) {
			originalRequest._retry = true
			// refresh 관련 세션 만료
			try {
				const res = await UserApi.refreshToken()
				// access_token 다시 세팅
				const { token } = res.data
				TokenService.setAccessToken(token) // 새로운 access token 세팅
				originalRequest.headers['Authorization'] = `bearer ${token}`
				return axiosInstance(originalRequest) // 재요청
			} catch (err) {
				if (err.response.status === 403) {
					// refresh 토큰도 만료된 경우 로그아웃
					await UserApi.logout()
					TokenService.removeAccessToken()
					UserInfoService.removeUserInfo()
					return Promise.reject(error)
				}
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	},
)

export default axiosInstance
