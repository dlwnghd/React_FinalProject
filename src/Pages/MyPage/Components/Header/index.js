import { Outlet } from 'react-router-dom'
import MyPageNav from '../Navigation/Navigation'
import Profile from './Components/Profile'
import useGetMyPageMainData from '../../../../Hooks/Queries/get-myPageMain'

function MyPageIndex() {
	const { data: mainData, status, error } = useGetMyPageMainData()

	if (status === 'loading') return // 로딩 중일 때
	if (error) return // 에러일 때

	return (
		<>
			<Profile mainData={mainData} />
			<MyPageNav type={'myPage'} />
			<Outlet />
		</>
	)
}

export default MyPageIndex
