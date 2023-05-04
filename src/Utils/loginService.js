import TokenService from './tokenService'
import UserInfoService from './userInfoService'

export const LoginService = {
	login(token, userInfo) {
		TokenService.setAccessToken(token)
		UserInfoService.setUserInfo(userInfo)
	},
	logout() {
		TokenService.removeAccessToken()
		UserInfoService.removeUserInfo()
	},
}
