import { atom } from 'recoil'
import ATOM_KEY from '../Consts/atom.key'

export const isOpenModalAtom = atom({
	key: ATOM_KEY.MODAL,
	default: false,
})
