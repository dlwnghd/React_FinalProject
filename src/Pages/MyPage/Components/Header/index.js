import Profile from './Components/Profile'
import useGetMyPageMainData from '../../../../Hooks/Queries/get-myPageMain'
import MyPageNav from './Components/Navigation'
import ErrorFallback from '../../../../Components/Error/ErrorFallback'

function MyPageIndex() {
	const { data: mainData, status, error } = useGetMyPageMainData()

	if (status === 'loading') return // 로딩 중일 때

	if (error) {
		return <ErrorFallback error={error} />
	}

	if (!error)
		return (
			<>
				<Profile mainData={mainData} />
				<MyPageNav type={'myPage'} />
			</>
		)
}

export default MyPageIndex
