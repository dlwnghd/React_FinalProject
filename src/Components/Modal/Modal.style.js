import styled, { css, keyframes } from 'styled-components'

const sizeCSS = {
	small: css`
		width: 30vw;
		min-width: 350px;
		height: 200px;
		padding: 12px;
	`,
	medium: css`
		width: 30vw;
		min-width: 350px;
		height: 280px;
		padding: 12px;
	`,
	large: css`
		width: 30vw;
		min-width: 350px;
		height: 500px;
	`,
	extra: css`
		width: 70vw;
		min-width: 350px;
		height: 750px;
		padding: 12px;
	`,
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Modal = styled.div`
	${({ size }) => sizeCSS[size]}
	position: relative;
	padding: 20px;
	background-color: rgb(244, 244, 250);
	opacity: 0;
	animation: ${fadeIn} 0.3s ease;
	animation-fill-mode: forwards;

	&.active {
		opacity: 1;
	}
`

export const ModalTitle = styled.div`
	font-size: 20px;
	font-weight: bold;
	padding-bottom: 10px;
	border-bottom: 2px solid black;
`

export const Wrapper = styled.div`
	position: fixed;
	z-index: 99999;
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
	opacity: 0;
	animation: ${fadeIn} 0.3s ease;
	animation-fill-mode: forwards;
	&.active {
		opacity: 1;
	}
`
