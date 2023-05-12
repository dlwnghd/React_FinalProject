import styled, { css } from 'styled-components'

const variantCSS = {
	default: css`
		background-color: ${({ theme }) => theme.COLOR.common.gray[300]};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};

		&:disabled {
			background-color: ${({ theme }) => theme.COLOR.common.gray[200]};
		}
	`,
	'default-reverse': css`
		border: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
		font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
	`,
}

const shapeCSS = {
	default: css`
		border-radius: 2rem;
	`,
	square: css`
		border-radius: 0rem;
	`,
}

const sizeCSS = {
	default: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		width: 16rem;
		height: 3.8rem;
	`,

	full: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		width: 100%;
		height: 3.8rem;
	`,
}

export const Button = styled.button`
	${({ variant }) => variantCSS[variant]}
	${({ shape }) => shapeCSS[shape]}
    ${({ size }) => sizeCSS[size]}
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
