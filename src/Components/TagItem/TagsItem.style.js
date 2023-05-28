import styled, { css } from 'styled-components'
import { FlexCenterCSS } from '../../Styles/common'

const sizeCSS = {
	default: css`
		height: 4rem;
	`,
	small: css`
		height: 2rem;
	`,
}

const colorCSS = {
	default: css`
		background: ${({ theme }) => theme.COLOR.common.gray[100]};
	`,
	main: css`
		background: ${({ theme }) => theme.COLOR.main};
	`,
}

const shapeCSS = {
	curve: css`
		border-radius: 1rem;
	`,
	round: css`
		border-radius: 2rem;
	`,
}

export const TagItem = styled.div`
	width: 100%;
	cursor: pointer;
	${FlexCenterCSS}
	${({ size }) => sizeCSS[size]}
	${({ color }) => colorCSS[color]}
	${({ shape }) => shapeCSS[shape]}
`
