import styled from 'styled-components'
import { FlexCenterCSS } from '../../Styles/common'
import { FillHeart_Icon } from '../Icons/Icons'
import { useState } from 'react'
import productsMock from '../../__mock__/Data/Product/product.data'
import { useNavigate } from 'react-router-dom'

function FloatingBar() {
	//실험성으로 목 데이터를 입힌거라서 추후 수정 해야합니다.
	const [product, setProduct] = useState(productsMock[0])
	const navigate = useNavigate()

	return (
		<S.Wrapper>
			<S.InterestPrdBox>
				<span>관심 상품</span>
				<InterestPrd>
					<FillHeart_Icon />
					<span>{0}</span>
				</InterestPrd>
			</S.InterestPrdBox>
			<S.RecentPrdBox>
				<span>최근 본 상품</span>
				<RecentCount>{product.ProductImages.length}</RecentCount>
				<span>-----------</span>

				{product.ProductImages.map((images, idx) => {
					return (
						<RecentPrd
							images={images.imgUrl}
							key={idx}
							onClick={() => navigate(`/detail/${product.idx}`)}
						/>
					)
				})}
			</S.RecentPrdBox>
		</S.Wrapper>
	)
}

export default FloatingBar

const Wrapper = styled.section`
	${FlexCenterCSS}
	position: fixed;
	z-index: 100;
	width: 10rem;
	background-color: #fff;
	gap: 2rem;
	flex-direction: column;
	right: 0;
`

const InterestPrdBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem 0.5rem;
	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
	border: 1px solid black;
	width: 100%;
`

const InterestPrd = styled.div`
	& > svg {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		color: red;
	}
	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
	display: flex;
	justify-content: center;
`

const RecentPrdBox = styled.div`
	padding: 1rem 0.5rem;
	${FlexCenterCSS}
	gap: 0.5rem;
	flex-direction: column;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[200]};
	width: 100%;
`
const RecentCount = styled.span`
	color: red;
`
const RecentPrd = styled.div`
	width: 66px;
	height: 66px;
	background-image: ${({ images }) => `url(${images})`};
	background-repeat: no-repeat;
	background-size: cover;
	cursor: pointer;
`
const S = {
	Wrapper,
	InterestPrdBox,
	RecentPrdBox,
}
