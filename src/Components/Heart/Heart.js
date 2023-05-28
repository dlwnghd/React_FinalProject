import { useState } from 'react'
import { FillHeart_Icon, NotFillHeart_Icon } from '../Icons/Icons'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import { useLocation } from 'react-router'

function Heart({ like, hover, setHover, prod_idx, change_size }) {
	const [isHeart, setIsHeart] = useState(like)
	const location = useLocation()
	const validLocation = location?.pathname.split('/')[1]

	const { mutateAsync, isLoading } = useMutation(
		({ prod_idx }) => ProductApi.like({ prod_idx }),
		{
			onSuccess: res => {
				const data = res.data
				if (data.message === true) setIsHeart(true)
				if (data.message === false) setIsHeart(false)
			},
			onError: err => {
				console.log(err)
			},
		},
	)

	const onHeart = async () => {
		setIsHeart(prev => !prev)
		await mutateAsync({ prod_idx })
	}

	return (
		<S.Wrapper align={validLocation}>
			{isHeart ? (
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
	${({ align }) =>
		align === 'detail'
			? {
					position: 'relative',
					display: 'flex',
					top: '-0.1rem',
					left: '0%',
					transform: 'translate(0,0)',
			  }
			: {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
			  }};

	& > svg {
		cursor: pointer;
		color: ${({ theme }) => theme.COLOR.error};
	}
`

const S = {
	Wrapper,
}
