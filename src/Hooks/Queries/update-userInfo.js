import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserApi from '../../Apis/userApi'
// import QUERY_KEY from '../../Consts/query.key'
import useUser from '../useUser'
import { useRecoilValue } from 'recoil'
import { userInfoAtom } from '../../Atoms/userInfo.atom'
import axios from 'axios'

const useUpdateUserInfo = () => {
	const client = useQueryClient()
	const user = useUser()
	const userAtomInfo = useRecoilValue(userInfoAtom)
	const { mutateAsync, isLoading } = useMutation(
		async ({ email, nickName, phone, region, profile_url }) =>
			await axios.all([
				UserApi.userEdit({ email, nickName, phone, region }),
				profile_url && UserApi.userEditProfile(profile_url),
			]),

		{
			onSuccess: res => {
				console.log(res)
				const editData = JSON.parse(res[0].config.data)
				if (res[1]) {
					user.editUserInfo({
						email: editData.email,
						nickName: editData.nickName,
						profileUrl: res[1].data.profile_url,
						region: editData.region,
						socket: userAtomInfo.socket,
					})
				} else {
					user.editUserInfo({
						email: editData.email,
						nickName: editData.nickName,
						profileUrl: userAtomInfo.profileUrl,
						region: editData.region,
						socket: userAtomInfo.socket,
					})
				}
				// client.invalidateQueries([
				// 	QUERY_KEY.GET_USER_INFO,
				// 	QUERY_KEY.GET_MYPAGE_MAIN_DATA,
				// ])
			},
			onError: error => {
				console.error(error)
			},
		},
	)
	return { mutateAsync, isLoading }
}

export default useUpdateUserInfo
