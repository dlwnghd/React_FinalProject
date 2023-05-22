import { io } from 'socket.io-client'

export const socket = io('https://topdragon.co.kr/api/chat')

export const connectSocket = () => {
	if (socket) return
	socket.connect()
	console.log(socket)
}

export const disconnectSocket = () => {
	if (socket == null || socket.connected === false) {
		return
	}
	socket.disconnect()
	socket = undefined
}
