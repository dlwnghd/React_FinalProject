import LOCAL_STORAGE_KEY from '../Consts/storage.key'

export const getAccessToken = () => {
	return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
}

export const removeAccessToken = () => {
	localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
}

export const setAccessToken = accessToken => {
	localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
}
