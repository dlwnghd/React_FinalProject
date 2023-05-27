import Profile from './Components/Profile'
import useGetMyPageMainData from '../../../../Hooks/Queries/get-myPageMain'
import MyPageNav from './Components/Navigation'
import ErrorFallback from '../../../../Components/Error/ErrorFallback'
import ProfileSkeleton from './Components/ProfileSkeleton'

function MyPageIndex() {
	const { data: mainData, status, error } = useGetMyPageMainData()

	if (status === 'loading') {
		return <ProfileSkeleton />
	}

	if (status === 'error') {
		return <ErrorFallback error={error} />
	}

	return (
		<>
			<Profile mainData={mainData} />
			<MyPageNav type={'myPage'} />
		</>
	)
}

export default MyPageIndex
