import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import useChatModal from '../../Hooks/useChatModal'
import ChatModal from '../ChatModal'

function Layout() {
	const { chatModalOpen } = useChatModal()

	return (
		<>
			{chatModalOpen && <ChatModal />}
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
