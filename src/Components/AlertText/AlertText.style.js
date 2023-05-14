import styled, { css } from 'styled-components'

const typeCSS = {
	default: css`
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
	`,
	error: css`
		color: ${({ theme }) => theme.COLOR.error};
	`,
	success: css`
		color: ${({ theme }) => theme.COLOR.success};
	`,
}

const sizeCSS = {
	default: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	`,
	small: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	`,
	medium: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	`,
}

export const AlertText = styled.p`
	${({ type }) => typeCSS[type]};
	${({ size }) => sizeCSS[size]}
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	margin-bottom: 1.2rem;
	padding-left: 0.5rem;
`
