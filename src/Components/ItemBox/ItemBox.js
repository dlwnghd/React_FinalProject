import styled from 'styled-components'
import { EtcOption_Icon } from '../Icons/Icons'
import { FlexBetweenCSS } from '../../Styles/common'
import { elapsedTime } from './timeSet'
import { useState } from 'react'
import Heart from '../Heart/Heart'

function ItemBox({
	posterPath,
	title,
	description,
	price,
	isLiked,
	createdAt,
	status,
	prod_idx,
	productsTags,
	...rest
}) {
	const [isHoverItemBox, setIsHoverItemBox] = useState(true)

	const heartProps = {
		like: isLiked,
		prod_idx: prod_idx,
	}

	return (
		<S.Wrapper>
			<S.IMGContainer>
				{isHoverItemBox && <Heart {...heartProps} />}
				<S.IMGBox posterIMG={posterPath} {...rest}></S.IMGBox>
			</S.IMGContainer>
			<S.DescContainer>
				<S.DescBox description={description}>
					<h4>{title}</h4>
					{description !== '' ? (
						<p>{description}</p>
					) : (
						<EtcOption_Icon size="30" />
					)}
				</S.DescBox>
				<S.DescBox2>
					<h4>{price === 0 ? '무료' : `${price.toLocaleString()}원`}</h4>
					<span>{elapsedTime(createdAt)}</span>
				</S.DescBox2>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ItemBox

const Wrapper = styled.div`
	${FlexBetweenCSS}
	box-shadow:0 0 0.3rem rgba(0,0,0,0.2);
	/* border-radius: 1rem; */
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;

	&:hover {
		box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.3);
	}
`

const IMGContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	border-bottom: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[100]};

	& > svg {
		position: absolute;
		z-index: 999;
		cursor: pointer;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: ${({ theme }) => theme.COLOR.main};
	}

	&::hover {
		opacity: 0.5;
	}

	&::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const IMGBox = styled.div`
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;
	height: 100%;
	cursor: pointer;
`

const DescContainer = styled.div`
	${FlexBetweenCSS}
	width:100%;
	padding: 0 2rem;
	flex-direction: column;
	align-items: baseline;
	margin: 2rem 0;
`

const DescBox = styled.div`
	width: 100%;
	${({ description }) => description === '' && FlexBetweenCSS}

	& > h4 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	& > p {
		margin: 1rem 0 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space: nowrap; 1줄로 넘친 글자를 생략할 때 이용 */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
`

const DescBox2 = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const S = {
	Wrapper,
	IMGContainer,
	IMGBox,
	DescContainer,
	DescBox,
	DescBox2,
}
