import { atom } from 'recoil'
import ATOM_KEY from '../Consts/atom.key'
import UserInfoService from '../Utils/loginService'

export const userInfoAtom = atom({
	key: ATOM_KEY.USER_INFO,
	default: UserInfoService.getUserInfo() ?? {},
})
