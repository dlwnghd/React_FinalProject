import styled from 'styled-components'
import {
	FlexBetweenCSS,
	FlexCenterCSS,
} from '../../../../../../../../Styles/common'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	min-height: 9.5rem;
	padding: 1rem;
	border-radius: 1rem;
	box-shadow: 0 4px 14px rgba(48, 52, 65, 0.08);
	background-color: ${({ theme }) => theme.COLOR.common.white};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: ${({ state }) => state === 'last' && 'none'};
		min-height: 5rem;
	}
`

export const TitleContainer = styled.div`
	${FlexBetweenCSS};
	line-height: 2.3rem;
`

export const PriceContainer = styled.div`
	height: 4rem;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		height: 2.5rem;
	}
`

export const IconBox = styled.div`
	width: 3rem;
	height: 3rem;
	${FlexCenterCSS}
	border-radius: 1rem;
	background-color: ${({ colorCode }) => colorCode};

	& > svg {
		width: 80%;
		height: 80%;
	}
`

export const Title = styled.div`
	display: inline-block;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	color: ${({ theme }) => theme.COLOR.common.gray[200]};
`

export const PriceText = styled.div`
	font-size: ${({ theme, size }) => theme.FONT_SIZE[size]};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	color: ${({ theme }) => theme.COLOR.common.gray[200]};
`
