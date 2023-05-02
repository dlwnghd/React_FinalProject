import MyPageNav from '../Navigation/Navigation'
import Profile from './Components/Profile'

function MyPageHeader() {
	return (
		<>
			<Profile />
			<MyPageNav type={'myPage'} />
		</>
	)
}

export default MyPageHeader
