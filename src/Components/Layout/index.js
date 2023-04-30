import { Outlet } from 'react-router'
import Footer from './Footer/Footer'
import Header from './Header/Header'

function Layout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
