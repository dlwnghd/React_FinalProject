import { FillHeart_Icon, NotFillHeart_Icon } from '../Icons/Icons'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductApi from '../../Apis/productApi'
import Button from '../Button/Button'
import { FlexCenterCSS } from '../../Styles/common'

function Heart({ like, prod_idx, change_size }) {
	const [isLike, setIsLike] = useState(like)

	const location = useLocation()
	const validLocation = location?.pathname.split('/')[1]

	const queryClient = useQueryClient()

	const { mutateAsync, isLoading } = useMutation(
		() => ProductApi.like(prod_idx),
		{
			onSuccess: async res => {
				await queryClient.refetchQueries()
				const { message } = res.data
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

	return (
		<S.Wrapper mode={validLocation}>
			{validLocation === 'detail' ? (
				<>
					<StyledMainBtn
						onClick={onHeart}
						variant={'no-border'}
						shape={'soft'}
						size={'full'}
					>
						<p>찜</p>
						{isLike ? (
							<FillHeart_Icon size={change_size ? change_size : '30'} />
						) : (
							<NotFillHeart_Icon size={change_size ? change_size : '30'} />
						)}
					</StyledMainBtn>
				</>
			) : (
				<>
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
				</>
			)}
		</S.Wrapper>
	)
}

export default Heart

const Wrapper = styled.div`
	${({ mode }) =>
		mode === 'detail' && {
			width: '100%',
			height: '100%',
		}}

	& svg {
		cursor: pointer;
		color: ${({ theme }) => theme.COLOR.error};

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
				  }};
	}
`

const StyledMainBtn = styled(Button)`
	${FlexCenterCSS}
	background: ${({ theme }) => theme.COLOR.common.white};
	color: ${({ theme }) => theme.COLOR.error};
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
	height: 6rem;
	border: none;
	box-sizing: border-box;

	& > p {
		font-size: 2rem;
		margin-right: 0.3rem;
	}
`

const S = {
	Wrapper,
	StyledMainBtn,
}
