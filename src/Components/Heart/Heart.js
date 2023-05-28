import { useState } from 'react'
import { FillHeart_Icon, NotFillHeart_Icon } from '../Icons/Icons'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'

function Heart({ like, hover, setHover, prod_idx }) {
	const [isHeart, setIsHeart] = useState(like)

	const { mutateAsync, isLoading } = useMutation(
		({ prod_idx }) => ProductApi.like({ prod_idx }),
		{
			onSuccess: data => {
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
		<S.Wrapper>
			{isHeart ? (
				<FillHeart_Icon size="30" onClick={onHeart} />
			) : (
				<NotFillHeart_Icon size="30" onClick={onHeart} />
			)}
		</S.Wrapper>
	)
}

export default Heart

const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	& > svg {
		cursor: pointer;
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const S = {
	Wrapper,
}
