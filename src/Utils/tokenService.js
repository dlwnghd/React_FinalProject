import LOCAL_STORAGE_KEY from '../Consts/storage.key'

const TokenService = {
	getAccessToken() {
		return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
	},
	removeAccessToken() {
		localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
	},
	setAccessToken(accessToken) {
		localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
	},
}

export default TokenService
