// // 소켓 생성
// export const socket = io('https://topdragon.co.kr')

// // 최초 소켓 연결
// export const firstConnect = userSocketId => {
// 	socket.id = userSocketId
// 	socket.connect()
// 	socket.emit('connect-user', {
// 		token: userSocketId,
// 	})

// 	return socket
// }

// //일단 이거는 내일 한번 내가 확인해보겠음.
// export const connect = socket.connect()

// // 소켓 연결 해제
// export const disconnectSocket = () => {
// 	if (socket == null || socket.connected === false) {
// 		return
// 	}
// 	socket.disconnect()
// 	socket = undefined
// }
