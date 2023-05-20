import styled from 'styled-components'
import { EtcOption_Icon } from '../../../../../Components/Icons/Icons'
import { FlexBetweenCSS } from '../../../../../Styles/common'
import Button from '../../../../../Components/Button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import ProductApi from '../../../../../Apis/productApi'

function MyPrdItemBox({ item }) {
	const navigate = useNavigate()
	const [editOption, setEditOption] = useState(false)

	const { img_url, title, price, status, idx } = item

	//물품 삭제
	const onProductDel = async () => {
		// try {
		// 	await ProductApi.delete(idx)
		// } catch (err) {}
		console.log('삭제')
	}

	//물품 수정

	/*
	1. 수정 및 삭제 뜨는 state가 onBlur일때는 false로 할수있는 로직
	
	채팅에 관한거
	판매중을 눌렀을때 채팅하는 사람들의 목록이 떠야함
	채팅 버튼은 채팅이 왔으면 표시를 해줄 예정
	*/

	return (
		<S.Wrapper>
			<S.IMGContainer posterIMG={img_url} status={status}>
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
								<div onClick={() => navigate(`${item.idx}`)}>수정</div>
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
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		top: 25%;
		left: 25%;
	}
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
	position: absolute;
	bottom: 4rem;
	z-index: 100;
	width: 6rem;
	right: 1rem;
	text-align: center;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	position: absolute;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 6rem;
	}
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
