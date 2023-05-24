import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import UserApi from '../../Apis/userApi'
import { useState } from 'react'
import MESSAGE from '../../Consts/message'
import { useNavigate } from 'react-router'

const getUserInfo = async () => {
	const res = await UserApi.userInfo()
	return res.data
}

const useGetUserInfo = () => {
	const [message, setMessage] = useState(MESSAGE.USEREDIT.SUCCESS)
	const navigate = useNavigate()
	const { data, error, status, isLoading } = useQuery(
		[QUERY_KEY.GET_USER_INFO],
		() => getUserInfo(),
		{
			cacheTime: 1000 * 5 * 60,
			// onSuccess: () => {},
			// onError: () => {
			// 	setMessage(MESSAGE.USERDATA.FAILURE)
			// 	setIsOpenModal(true)
			// 	navigate('/mypage-bank')
			// },
		},
	)
	return { data, error, status, isLoading }
}
export default useGetUserInfo
