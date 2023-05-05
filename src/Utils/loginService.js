import LOCAL_STORAGE_KEY from '../Consts/storage.key'
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
	saveId(email) {
		localStorage.setItem(LOCAL_STORAGE_KEY.SAVE_ID, email)
	},
}
