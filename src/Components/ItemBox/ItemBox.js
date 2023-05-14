import styled from 'styled-components'
import {
	EtcOption_Icon,
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../Icons/Icons'
import { useState } from 'react'
import { FlexBetweenCSS } from '../../Styles/common'
import { elapsedTime } from './timeSet'

// 컴포넌트 불러올 때, props로
// 데이터(상품 이미지, 상품 제목, 상품 설명, 상품 가격) 보내와서 입히기
function ItemBox({
	posterPath,
	title,
	context,
	price,
	isLiked,
	createdAt,
	...rest
}) {
	const [isHeart, setIsHeart] = useState(isLiked)
	const [isHoverItemBox, setIsHoverItemBox] = useState(false)

	const onHeart = () => {
		setIsHeart(prev => !prev)
		/*
			if (isHoverItemBox) {
				setIsHoverItemBox(false)
			}
		*/
	}

	const onMouseEnter = e => {
		/*
			1. 하트가 클릭되었을 때, return
			2. 하트 클릭을 다루는 state인 isHeart로 조건식 처리
			3. ...
		*/
		setIsHoverItemBox(true)
	}

	const onMouseLeave = e => {
		setIsHoverItemBox(false)
	}

	return (
		<S.Wrapper>
			<S.IMGContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				{isHoverItemBox && (
					<>
						{!isHeart ? (
							<NotFillHeart_Icon size="30" onClick={onHeart} />
						) : (
							<FillHeart_Icon size="30" onClick={onHeart} />
						)}
						<S.IMGHoverCover {...rest}></S.IMGHoverCover>
					</>
				)}
				<S.IMGList posterIMG={posterPath}></S.IMGList>
			</S.IMGContainer>
			<S.DescContainer>
				<S.DescBox context={context}>
					<h4>{title}</h4>
					{context !== '' ? <p>{context}</p> : <EtcOption_Icon size="30" />}
				</S.DescBox>
				<S.DescBox2>
					<h4>{price.toLocaleString()}원</h4>
					<span>{elapsedTime(createdAt)}</span>
				</S.DescBox2>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ItemBox

const Wrapper = styled.div`
	${FlexBetweenCSS}
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;
`

const IMGContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	& > svg {
		position: absolute;
		z-index: 999;
		cursor: pointer;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: ${({ theme }) => theme.COLOR.main};

		// 파람으로 보낼 데이터의 디폴트와 변수를 구분해서 삼항 연산자로 정리
	}
`

const IMGHoverCover = styled.div`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	z-index: 998;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
`

const IMGList = styled.div`
	position: relative;
	cursor: pointer;
	width: 100%;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;

	&::hover {
		opacity: 0.5;
	}

	&::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const DescContainer = styled.div`
	${FlexBetweenCSS}
	width:100%;
	padding: 0 1rem;
	flex-direction: column;
	align-items: baseline;
	margin-top: 2rem;
	/* background: red; */
`

const DescBox = styled.div`
	width: 100%;
	${({ context }) => context === '' && FlexBetweenCSS}

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
	IMGHoverCover,
	IMGList,
	DescContainer,
	DescBox,
	DescBox2,
}
