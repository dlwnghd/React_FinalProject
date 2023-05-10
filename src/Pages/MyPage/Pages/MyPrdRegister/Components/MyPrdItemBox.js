import styled from 'styled-components'
import { EtcOption_Icon } from '../../../../../Components/Icons/Icons'
import { FlexBetweenCSS } from '../../../../../Styles/common'
import Button from '../../../../../Components/Button/Button'
import { useState } from 'react'

import ProductApi from '../../../../../Apis/productApi'

function MyPrdItemBox({ posterPath, title, price, status, idx, ...rest }) {
	const [editOption, setEditOption] = useState(false)

	const onProductDel = async () => {
		try {
			await ProductApi.delete(idx)
		} catch (err) {
			console.log('실패')
		}
	}
	return (
		<S.Wrapper>
			<S.IMGContainer posterIMG={posterPath} status={status}>
				{status === '판매완료' && <S.SoldOut>SOLD OUT</S.SoldOut>}
			</S.IMGContainer>
			<S.DescContainer>
				<S.DescBox>
					<h4>{title}</h4>
					<S.IconContainer>
						<EtcOption_Icon
							size="30"
							onClick={() => setEditOption(prev => !prev)}
						/>
						{editOption && (
							<S.EditBox>
								<div>수정</div>
								<div onClick={onProductDel}>삭제</div>
							</S.EditBox>
						)}
					</S.IconContainer>
				</S.DescBox>
				<h4>{price.toLocaleString()}원</h4>
			</S.DescContainer>
			<S.ButtonContainer>
				<Button shape={'square'} style={{ width: '48%' }}>
					채팅
				</Button>
				<Button
					shape={'square'}
					style={{ background: status === '판매완료' && '#AAA', width: '48%' }}
					disabled={status === '판매완료' ? true : false}
				>
					{status}
				</Button>
			</S.ButtonContainer>
		</S.Wrapper>
	)
}

export default MyPrdItemBox

const Wrapper = styled.div`
	${FlexBetweenCSS}
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;

	& > svg {
		position: absolute;
		z-index: 999;
		cursor: pointer;
		top: 1.4rem;
		right: 1.4rem;
		color: ${({ theme }) => theme.COLOR.main};
		font-weight: 900;
		// 파람으로 보낼 데이터의 디폴트와 변수를 구분해서 삼항 연산자로 정리
	}
`

const IMGContainer = styled.div`
	position: relative;
	cursor: pointer;
	width: 100%;
	height: 27.6rem;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;
	filter: brightness(${({ status }) => status === '판매완료' && '50%'});
	z-index: 10;
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
	${FlexBetweenCSS}

	& > h4 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`

const ButtonContainer = styled.div`
	margin-top: 1.5rem;
	width: 100%;
	${FlexBetweenCSS}
`
const SoldOut = styled.h2`
	position: absolute;
	color: ${({ theme }) => theme.COLOR.common.white};
	top: 40%;
	z-index: 100;
	left: 5%;
`
const IconContainer = styled.div`
	cursor: pointer;
	position: relative;
`
const EditBox = styled.div`
	border: 2px solid ${({ theme }) => theme.COLOR.common.gray[200]};
	& > div {
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		padding: 0.5rem;
		:hover {
			background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
		}
	}
	& > div:first-child {
		border-bottom: 2px solid ${({ theme }) => theme.COLOR.common.gray[200]};
	}
	width: 5rem;
	right: 1rem;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	position: absolute;
`
const S = {
	Wrapper,
	IMGContainer,
	DescContainer,
	DescBox,
	SoldOut,
	ButtonContainer,
	IconContainer,
	EditBox,
}
