import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
	key: 'myChatRoomList',
})
export const myChatRoomList = atom({
	key: 'myChatRoomList',
	default: [],
	effects_UNSTABLE: [persistAtom],
})
