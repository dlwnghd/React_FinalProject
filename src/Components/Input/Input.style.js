import styled, { css } from 'styled-components'

const statusCSS = {
	success: css`
		border: 1px solid ${({ theme }) => theme.COLOR.success};
	`,
	error: css`
		border: 1px solid ${({ theme }) => theme.COLOR.error};
	`,
	default: css`
		border: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	`,
}

export const Input = styled.input`
	width: 100%;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	border-radius: 0.125rem;
	background: none;
	padding: 1rem 1.2rem;
	${({ status }) => statusCSS[status]};

	&:disabled {
		color: ${({ theme }) => theme.COLOR.common.gray[400]};
		opacity: 1;
	}
`
