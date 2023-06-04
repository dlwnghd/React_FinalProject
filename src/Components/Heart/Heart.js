import { FillHeart_Icon, NotFillHeart_Icon } from '../Icons/Icons'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import QUERY_KEY from '../../Consts/query.key'

function Heart({ like, prod_idx, change_size, category }) {
	const [isLike, setIsLike] = useState(like)

	const location = useLocation()
	const validLocation = location?.pathname.split('/')[1]

	const queryClient = useQueryClient()

	const { mutateAsync, isLoading } = useMutation(
		() => ProductApi.like(prod_idx),
		{
			onSuccess: async res => {
				await queryClient.refetchQueries(
					[QUERY_KEY.GET_MAINPAGE_MAIN_DATA],
					[QUERY_KEY.GET_DETAILPAGE_DATA, prod_idx],
				)
				const { message } = res.data
				console.log(res)
				setIsLike(message)
			},
			onError: err => {
				console.log(err)
			},
		},
	)

	const onHeart = async () => {
		await mutateAsync(prod_idx)
	}

	if (isLoading) return

	return (
		<S.Wrapper mode={validLocation}>
			{isLike ? (
				<FillHeart_Icon
					size={change_size ? change_size : '30'}
					onClick={onHeart}
				/>
			) : (
				<NotFillHeart_Icon
					size={change_size ? change_size : '30'}
					onClick={onHeart}
				/>
			)}
		</S.Wrapper>
	)
}

export default Heart

const Wrapper = styled.div`
	${({ mode }) =>
		mode === 'detail'
			? {
					position: 'relative',
					display: 'flex',
					top: '-0.1rem',
					left: '0%',
					transform: 'translate(0,0)',
			  }
			: {
					position: 'absolute',
					top: '5%',
					right: '5%',
					// transform: 'translate(-50%,-50%)',
			  }};

	& > svg {
		cursor: pointer;
		color: ${({ theme }) => theme.COLOR.error};
	}
`

const S = {
	Wrapper,
}
