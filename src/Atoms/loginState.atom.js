import { atom } from 'recoil'
import ATOM_KEY from '../Consts/atom.key'
import { getAccessToken } from '../Utils/tokenService'

export const loginStateAtom = atom({
	key: ATOM_KEY.LOGIN,
	default: {
		accessToken: getAccessToken() ?? '',
	},
})
