import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socketContext = createContext()
export const useSocket = () => useContext(socketContext)

const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState()

	useEffect(() => {
		if (socket) return
		setSocket(io(process.env.REACT_APP_BACKEND_URL))
	}, [])

	return (
		<socketContext.Provider value={socket}>{children}</socketContext.Provider>
	)
}

export default SocketProvider
