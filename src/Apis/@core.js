import axios from 'axios'
import TokenService from '../Utils/tokenService'
import UserApi from './userApi'
import UserInfoService from '../Utils/userInfoService'
import { COOKIE_KEY } from '../Consts/storage.key'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	withCredentials: true,
})

// 키로 쿠키 값을 찾는 함수
const getCookieValue = cookieName => {
	const cookies = document.cookie
	const [cookie] = cookies
		.split(';')
		.map(cookie => cookie.trim())
		.filter(cookie => cookie.startsWith(`${cookieName}=`))
	if (cookie) {
		return decodeURIComponent(cookie.split('=')[1])
	}
	return null
}

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
		if (error.response.status === 417) {
			// access token 재발급 필요
			await UserApi.logout()
			TokenService.removeAccessToken()
		}

		if (error.response.status === 403) {
			// refresh 토큰도 만료된 경우 로그아웃
			await UserApi.logout()
			TokenService.removeAccessToken()
			UserInfoService.removeUserInfo()
			return Promise.reject(error)
		}

		// access token 만료
		if (error.response.status === 417 && !originalRequest._retry) {
			originalRequest._retry = true // 재요청임을 표시

			if (!getCookieValue(COOKIE_KEY.REFRESH_TOKEN)) {
				// 쿠키에 refresh token이 없다면 === access token을 재발급 받지 못함 => 로그아웃 하고 바로 reject
				await UserApi.logout()
				TokenService.removeAccessToken()
				UserInfoService.removeUserInfo()
				return Promise.reject(error)
			}

			const res = await UserApi.refreshToken()
			// access_token 다시 세팅
			const { token } = res.data
			TokenService.setAccessToken(token) // 새로운 access token 세팅
			originalRequest.headers['Authorization'] = `bearer ${token}`
			return axiosInstance(originalRequest) // 재요청
		}
		return Promise.reject(error)
	},
)

export default axiosInstance
