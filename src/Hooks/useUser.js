import { useSetRecoilState } from 'recoil'
import { userInfoAtom } from '../Atoms/userInfo.atom'
import { loginStateAtom } from '../Atoms/loginState.atom'
import TokenService from '../Utils/tokenService'
import UserInfoService from '../Utils/userInfoService'

const useUser = () => {
	const setUserInfo = useSetRecoilState(userInfoAtom)
	const loginState = useSetRecoilState(loginStateAtom)

	const login = (token, userInfo) => {
		TokenService.setAccessToken(token)
		UserInfoService.setUserInfo(userInfo)
		setUserInfo(userInfo)
		loginState(true)
	}

	const logout = () => {
		TokenService.removeAccessToken()
		UserInfoService.removeUserInfo(userInfo)
		setUserInfo({})
		loginState(false)
	}

	const editUserInfo = userInfo => {
		UserInfoService.setUserInfo(userInfo)
		setUserInfo(userInfo)
	}

	return { login, logout, editUserInfo }
}
export default useUser
