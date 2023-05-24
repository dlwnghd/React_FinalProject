import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserApi from '../../Apis/userApi'
import QUERY_KEY from '../../Consts/query.key'
import axios from 'axios'

const useUpdateUserInfo = () => {
	const client = useQueryClient()
	const { mutateAsync, isLoading } = useMutation(
		async ({ email, nickName, phone, region, profile_url }) =>
			await axios.all([
				UserApi.userEdit({ email, nickName, phone, region }),
				UserApi.userEditProfile(profile_url),
			]),
		{
			onSuccess: data => {
				// const { data } = res.data
				client.cancelQueries([
					QUERY_KEY.GET_MYPAGE_MAIN_DATA,
					QUERY_KEY.GET_USER_INFO,
				])
				client.setQueryData([QUERY_KEY.GET_USER_INFO], oldData => {
					console.log(oldData)
					console.log(email)
					let updateData = oldData.find(user => {
						user.email === email
					})
					console.log(updateData)
					updateData.nickName = nickName
					updateData.phone = phone
					updateData.region = region
					updateData.profile_url = profile_url
					return oldData
				})
				client.setQueryData([QUERY_KEY.GET_MYPAGE_MAIN_DATA], oldData => {
					console.log(oldData)
					let updateData = oldData.find(user => {
						console.log(user)
						user.nickName === nickName
					})
					updateData.profile_url = profile_url
					return oldData
				})
			},
		},
	)
	return { mutateAsync, isLoading }
}

export default useUpdateUserInfo
