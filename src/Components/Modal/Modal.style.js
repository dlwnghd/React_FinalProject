import styled, { css } from 'styled-components'

const sizeCSS = {
	small: css`
		width: 30vw;
		min-width: 433px;
		height: 200px;
		padding: 12px;
	`,
	medium: css`
		width: 30vw;
		min-width: 433px;
		height: 280px;
		padding: 12px;
	`,
	large: css`
		width: 30vw;
		min-width: 433px;
		height: 450px;
		padding: 12px;
	`,
	extra: css`
		width: 70vw;
		min-width: 433px;
		height: 750px;
		padding: 12px;
	`,
}

export const Modal = styled.div`
	${({ size }) => sizeCSS[size]}
	position: relative;
	padding: 20px;
	background-color: rgb(244, 244, 250);
`

export const ModalTitle = styled.div`
	font-size: 20px;
	font-weight: bold;
	padding-bottom: 10px;
	border-bottom: 2px solid black;
`

export const Wrapper = styled.div`
	position: fixed;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
`
