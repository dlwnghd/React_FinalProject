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
	setSaveId(email) {
		localStorage.setItem(LOCAL_STORAGE_KEY.SAVE_ID, email)
	},
	getSavedId() {
		return localStorage.getItem(LOCAL_STORAGE_KEY.SAVE_ID)
	},
}
