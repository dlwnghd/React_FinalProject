import styled, { css } from 'styled-components'

const sizeCSS = {
	default: css`
		width: 1.8rem;
		height: 1.8rem;
	`,
	medium: css`
		width: 2.3rem;
		height: 2.3rem;
	`,
	large: css`
		width: 3rem;
		height: 3rem;
	`,
}

const colorCSS = {
	default: css`
		background-color: ${({ theme }) => theme.COLOR.common.gray[200]};
	`,
	main: css`
		background-color: ${({ theme }) => theme.COLOR.main};
	`,
}

const shapeCSS = {
	default: css`
		border-radius: 0;
	`,
	curve: css`
		border-radius: 0.35rem;
	`,
}

export const CheckBox = styled.div`
	display: inline-block;
	& > input {
		appearance: none;
		border: 1.5px solid gainsboro;
		${({ size }) => sizeCSS[size]};
		${({ shape }) => shapeCSS[shape]}
	}

	& > input:checked {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		${({ color }) => colorCSS[color]}
	}
`
