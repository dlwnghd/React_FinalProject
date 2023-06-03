import styled from 'styled-components'
import { useState } from 'react'
import { Down_Icon } from '../../../../../../../../../Components/Icons/Icons'
import { FlexBetweenCSS } from '../../../../../../../../../Styles/common'

const sellerText = '판매 내역'
const buyerText = '구매 내역'

function TypeSelectBox({ category, setCategory }) {
	const type = category === 'seller' ? sellerText : buyerText
	const [isOpenSlide, setIsOpenSlide] = useState(false)

	const onClickType = e => {
		const selected = e.target.textContent
		setCategory(selected === sellerText ? 'seller' : 'buyer')
	}

	return (
		<S.Wrapper onClick={() => setIsOpenSlide(prev => !prev)}>
			<S.BoxContainer>
				<span>{type}</span>
				<Down_Icon />
			</S.BoxContainer>
			{isOpenSlide && (
				<S.SelectContainer>
					<S.SelectItem onClick={onClickType} state={type === sellerText}>
						{sellerText}
					</S.SelectItem>
					<S.SelectItem onClick={onClickType} state={type === buyerText}>
						{buyerText}
					</S.SelectItem>
				</S.SelectContainer>
			)}
		</S.Wrapper>
	)
}
export default TypeSelectBox

const Wrapper = styled.div`
	position: relative;
	width: 13rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 10rem;
	}
`

const BoxContainer = styled.div`
	${FlexBetweenCSS};
	width: 100%;
	height: 3.5rem;
	padding: 0 1.3rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 0.5rem;
	cursor: pointer;

	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`

const SelectContainer = styled.ul`
	position: absolute;
	z-index: 10;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	margin-top: 0.8rem;
`

const SelectItem = styled.li`
	line-height: 3.5rem;
	padding: 0 1.3rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	color: ${({ theme, state }) => state && theme.COLOR.hover};
	cursor: pointer;

	&:hover {
		transition: all 0.1s ease-in-out;
		background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
	}
`

const S = { Wrapper, BoxContainer, SelectContainer, SelectItem }
