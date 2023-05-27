import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserApi from '../../Apis/userApi'
import QUERY_KEY from '../../Consts/query.key'

export const useUpdateUserInfo = () => {
	const client = useQueryClient()
	const { mutateAsync, isLoading } = useMutation(
		({ email, nickName, phone, region }) =>
			UserApi.userEdit({ email, nickName, phone, region }),
		{
			onSuccess: async () => {
				await client.invalidateQueries([
					QUERY_KEY.GET_USER_INFO,
					QUERY_KEY.GET_MYPAGE_MAIN_DATA,
				])
			},
			// onMutate: async data => {
			// 	await client.cancelQueries([
			// 		QUERY_KEY.GET_USER_INFO,
			// 		QUERY_KEY.GET_MYPAGE_MAIN_DATA,
			// 	])
			// 	client.setQueryData([QUERY_KEY.GET_USER_INFO], oldData => {
			// 		oldData = [oldData]
			// 		console.log(oldData)
			// 		console.log(data.email, oldData[0].email)
			// 		let updateData = oldData.find(user => {
			// 			return user.email === data.email
			// 		})
			// 		console.log(updateData)
			// 		updateData.nick_name = data.nickName
			// 		updateData.phone = data.phone
			// 		updateData.region = data.region
			// 		console.log(updateData)
			// 		return oldData
			// 	})
			// 	client.setQueryData([QUERY_KEY.GET_MYPAGE_MAIN_DATA], oldData => {
			// 		oldData = [oldData]
			// 		let updateData = oldData.find(user => {
			// 			console.log(user)
			// 			return user.nick_name === data.nickName
			// 		})
			// 		console.log(updateData)
			// 		return oldData
			// 	})
			// },
		},
	)
	return { mutateAsync, isLoading }
}

export const useUpdateProfileImg = () => {
	const client = useQueryClient()
	const { mutateAsync, isLoading } = useMutation(
		({ profile_url }) => UserApi.userEditProfile(profile_url),
		{
			onSuccess: async () => {
				await client.invalidateQueries([
					QUERY_KEY.GET_USER_INFO,
					QUERY_KEY.GET_MYPAGE_MAIN_DATA,
				])
			},
			// onMutate: data => {
			// 	client.cancelQueries([
			// 		QUERY_KEY.GET_USER_INFO,
			// 		QUERY_KEY.GET_MYPAGE_MAIN_DATA,
			// 	])
			// 	client.setQueryData([QUERY_KEY.GET_USER_INFO], oldData => {
			// 		let updateData = oldData.find(user => {
			// 			console.log(user)
			// 			return user.email === data.email
			// 		})
			// 		updateData.profile_url = data.profile_url
			// 		return oldData
			// 	})
			// 	client.setQueryData([QUERY_KEY.GET_MYPAGE_MAIN_DATA], oldData => {
			// 		console.log(oldData)
			// 		let updateData = oldData.find(user => {
			// 			return user.nick_name === data.nickName
			// 		})
			// 		updateData.profile_url = data.profile_url
			// 		return oldData
			// 	})
			// },
		},
	)
	return { mutateAsync, isLoading }
}
