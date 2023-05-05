import { atom } from 'recoil'
import ATOM_KEY from '../Consts/atom.key'
import UserInfoService from '../Utils/userInfoService'

export const userInfoAtom = atom({
	key: ATOM_KEY.USER_INFO,
	default: UserInfoService.getUserInfo() ?? {},
})
