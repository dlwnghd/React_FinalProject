import LOCAL_STORAGE_KEY from '../Consts/storage.key'

const UserInfoService = {
	setUserInfo(userInfo) {
		localStorage.setItem(LOCAL_STORAGE_KEY.USER_INFO, JSON.stringify(userInfo))
	},
	getUserInfo() {
		return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO))
	},
	removeUserInfo() {
		localStorage.removeItem(LOCAL_STORAGE_KEY.USER_INFO)
	},
}

export default UserInfoService
