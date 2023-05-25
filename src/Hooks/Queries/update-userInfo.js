import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserApi from '../../Apis/userApi'
import QUERY_KEY from '../../Consts/query.key'

export const useUpdateUserInfo = data => {
	const client = useQueryClient()
	const { mutateAsync, isLoading } = useMutation(
		({ email, nickName, phone, region }) =>
			UserApi.userEdit({ email, nickName, phone, region }),
		{
			onSuccess: () => {
				client.cancelQueries([
					QUERY_KEY.GET_MYPAGE_MAIN_DATA,
					QUERY_KEY.GET_USER_INFO,
				])
				client.setQueryData([QUERY_KEY.GET_USER_INFO], oldData => {
					console.log(oldData)
					console.log(data)
					let updateData = oldData.find(user => {
						console.log(user)
						user.email === data.email
					})
					updateData.nickName = data.nickName
					updateData.phone = data.phone
					updateData.region = data.region
					console.log(updateData)
					return oldData
				})
				client.setQueryData([QUERY_KEY.GET_MYPAGE_MAIN_DATA], oldData => {
					console.log(oldData)
					let updateData = oldData.find(user => {
						console.log(user)
						user.nickName === data.nickName
					})
					return oldData
				})
			},
		},
	)
	return { mutateAsync, isLoading }
}

export const useUpdateProfileImg = data => {
	const client = useQueryClient()
	const { mutateAsync, isLoading } = useMutation(
		({ profile_url }) => UserApi.userEditProfile(profile_url),
		{
			onSuccess: () => {
				client.cancelQueries([
					QUERY_KEY.GET_MYPAGE_MAIN_DATA,
					QUERY_KEY.GET_USER_INFO,
				])
				client.setQueryData([QUERY_KEY.GET_USER_INFO], oldData => {
					let updateData = oldData.find(user => {
						console.log(user)
						user.email === data.email
					})
					updateData.profile_url = data.profile_url
					return oldData
				})
				client.setQueryData([QUERY_KEY.GET_MYPAGE_MAIN_DATA], oldData => {
					console.log(oldData)
					let updateData = oldData.find(user => {
						console.log(user)
						user.nickName === data.nickName
					})
					updateData.profile_url = data.profile_url
					return oldData
				})
			},
		},
	)
	return { mutateAsync, isLoading }
}
