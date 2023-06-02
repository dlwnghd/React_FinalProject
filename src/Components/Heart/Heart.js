import { FillHeart_Icon, NotFillHeart_Icon } from '../Icons/Icons'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import usePostHeart from '../../Hooks/Queries/post-heart'
import { useState } from 'react'

function Heart({ like, prod_idx, change_size }) {
	const location = useLocation()
	const validLocation = location?.pathname.split('/')[1]

	const [isLike, setIsLike] = useState(like)

	const getMessage = message => {
		console.log(message)
		setIsLike(message)
	}

	const { mutateAsync, isLoading } = usePostHeart({ prod_idx }, getMessage)

	const onHeart = async () => {
		await mutateAsync({ prod_idx })
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
