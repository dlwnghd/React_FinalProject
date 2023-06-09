import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import ChatModal from '../ChatModal'
import useChatModal from '../../Hooks/useChatModal'

function Layout() {
	const currentURL = useLocation().pathname
	const isDetailPage = currentURL.includes('detail')

	const { chatModalOpen } = useChatModal()
	return (
		<>
			{chatModalOpen && (
				<ChatModal chatModalOpen={chatModalOpen} isDetailPage={isDetailPage} />
			)}
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
