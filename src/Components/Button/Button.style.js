import styled, { css } from 'styled-components'

const variantCSS = {
	default: css`
		background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};

		&:hover {
			background-color: ${({ theme }) => theme.COLOR.common.gray[300]};
			transition: all 0.2s ease-in-out;
		}

		&:disabled {
			background-color: ${({ theme }) => theme.COLOR.common.gray[200]};
		}
	`,
	'default-reverse': css`
		border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
		font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
		background-color: ${({ theme }) => theme.COLOR.common.white};

		&:hover {
			background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
			transition: all 0.2s ease-in-out;
		}
	`,
	'no-border': css`
		font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
		background-color: ${({ theme }) => theme.COLOR.common.white};
		border: none;

		&:hover {
			background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
			transition: all 0.2s ease-in-out;
		}
	`,
}

const shapeCSS = {
	default: css`
		border-radius: 2rem;
	`,
	soft: css`
		border-radius: 0.8rem;
	`,
	square: css`
		border-radius: 0rem;
	`,
}

const sizeCSS = {
	default: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		width: 16rem;
		height: 4.8rem;
	`,

	full: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		width: 100%;
		height: 4.8rem;
	`,
}

export const Button = styled.button`
	${({ variant }) => variantCSS[variant]}
	${({ shape }) => shapeCSS[shape]}
    ${({ size }) => sizeCSS[size]}
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
