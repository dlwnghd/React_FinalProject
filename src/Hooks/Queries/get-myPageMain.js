import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'
import MyPageApi from '../../Apis/mypageApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../Atoms/modal.atom'

const getMyPageMainData = async () => {
	const res = await MyPageApi.getMain()
	return res.data
}

const useGetMyPageMainData = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const setIsOpenModal = useSetRecoilState(isOpenModalAtom)

	const { data, error, status, isLoading, isError } = useQuery(
		[QUERY_KEY.GET_MYPAGE_MAIN_DATA],
		() => getMyPageMainData(),
		{
			cacheTime: 1000 * 60 * 30, // 30분
			onError: error => {
				// if (error.response.status === 403) {
				// 	navigate('/login', {
				// 		state: {
				// 			from: pathname,
				// 		},
				// 	})
				// 	return setIsOpenModal(true)
				// }
				// return Promise.reject(error)
			},
		},
	)

	return { data, error, status, isLoading, isError }
}
export default useGetMyPageMainData
