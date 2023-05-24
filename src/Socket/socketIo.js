import { io } from 'socket.io-client'

// 소켓 생성
const socket = io('https://topdragon.co.kr')

// 최초 소켓 연결
export const firstConnect = userSocketId => {
	const connectSocket = socket.connect()
	connectSocket.emit('connect-user', {
		socket: userSocketId,
	})

	console.log(`연결 성공  : ${userSocketId}님`)

	return connectSocket
}

//일단 이거는 내일 한번 내가 확인해보겠음.
export const connect = socket.connect()

// 소켓 연결 해제
export const disconnectSocket = () => {
	if (socket == null || socket.connected === false) {
		return
	}
	socket.disconnect()
	socket = undefined
}
