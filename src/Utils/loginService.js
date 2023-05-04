import { useSetRecoilState } from 'recoil'
import TokenService from './tokenService'
import UserInfoService from './userInfoService'
import { userInfoAtom } from '../Atoms/userInfo.atom'
import { loginStateAtom } from '../Atoms/loginState.atom'

const setUserInfoAtom = useSetRecoilState(userInfoAtom)
const setLoginStateAtom = useSetRecoilState(loginStateAtom)

export const LoginService = {
	login(token, userInfo) {
		TokenService.setAccessToken(token)
		UserInfoService.setUserInfo(userInfo)
		setUserInfoAtom(userInfo)
		setLoginStateAtom(true)
	},
	logout() {
		TokenService.removeAccessToken()
		UserInfoService.removeUserInfo()
		setUserInfoAtom({})
		setLoginStateAtom(false)
	},
}
