import axiosInstance from './@core'

const PATH = '/api/chat'

const ChatApi = {
	//채팅방 생성
	makeChat(prod_idx) {
		return axiosInstance.post(
			PATH,
			{ prod_idx },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	},
	//채팅 보내기
	sendMsg(room_idx, message) {
		return axiosInstance.post(PATH + '/send', { room_idx, message })
	},

	//채팅내역조회
	checkChatLog(room_idx) {
		return axiosInstance.get(PATH + '/chat-log', {
			params: { room_idx },
		})
	},
	//해당 채팅방 메시지 모두 읽기
	readAllRoomChat(room_idx) {
		return axiosInstance.get(PATH + '/read-all', { params: room_idx })
	},

	//전체 채팅방 조회
	chatRoomList() {
		return axiosInstance.get(PATH + '/chat-room-list')
	},

	// 특정 물품 채팅방 조회
	prdChatList(prod_idx) {
		console.log(prod_idx)
		return axiosInstance.get(PATH + '/product-chat-list', {
			params: { prod_idx },
		})
	},
}

export default ChatApi
