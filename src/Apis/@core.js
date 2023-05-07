import axios from 'axios'
import TokenService from '../Utils/tokenService'
import UserApi from './userApi'
import useUser from '../Hooks/useUser'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	withCredentials: true,
})

axiosInstance.interceptors.request.use(
	config => {
		const access_token = TokenService.getAccessToken()
		if (access_token) {
			config.headers.Authorization = `Bearer ${access_token}`
			return config
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
		if (error.response.status === 417) {
			// access token 재발급 필요
			await UserApi.logout()
			TokenService.removeAccessToken()
		}
		const originalRequest = error.config
		if (error.response.status === 403 && !originalRequest._retry) {
			// refresh 관련 세션 만료
			originalRequest._retry = true // 재요청 보냄을 의미
			try {
				const res = await UserApi.refreshToken()
				if (res.status === 200) {
					// access_token 다시 세팅
					const { token } = res.data
					TokenService.setAccessToken(token) // 새로운 access token 세팅
					axiosInstance.defaults.headers.common[
						'Authorization'
					] = `bearer ${token}`
					return axiosInstance(originalRequest) // 재요청
				}
			} catch (err) {
				// refresh 토큰도 만료된 경우 로그아웃
				const user = useUser()
				user.logout()
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	},
)

export default axiosInstance
