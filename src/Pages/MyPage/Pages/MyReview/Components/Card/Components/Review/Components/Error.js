import React from 'react'
import styled from 'styled-components'
import { FlexCenterCSS } from '../../../../../../../../../Styles/common'
import Button from '../../../../../../../../../Components/Button/Button'
import { ModalClose_icon } from '../../../../../../../../../Components/Icons/Icons'
import getErrorMessage from '../../../../../../../../../Utils/getErrorMessage'
import getComponentsByPeriod from '../../../../../../../../../Utils/getComponentsByPeriod'

function InnerError({ error, onCloseError }) {
	const status = error?.response?.status
	const { title, content } = getErrorMessage(status)
	const formattedText = getComponentsByPeriod(content)

	return (
		<S.Wrapper>
			<S.Container>
				<span onClick={onCloseError}>
					<ModalClose_icon size={18} />
				</span>
				<h4>{title}</h4>
				<p>{formattedText}</p>
			</S.Container>
		</S.Wrapper>
	)
}
export default InnerError

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.4);
	${FlexCenterCSS}
`

const Container = styled.div`
	position: relative;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	padding: 2rem;
	width: 45rem;
	border-radius: 0.8rem;
	${FlexCenterCSS}
	flex-direction: column;

	& > h4 {
		margin-bottom: 1rem;
	}

	& > span {
		position: absolute;
		right: 4px;
		top: 4px;
		cursor: pointer;
	}

	& > p {
		text-align: center;
	}
`

const StyledButton = styled(Button)`
	width: 10rem;
	height: 4rem;
	margin: 0 0.3rem;
`

const S = { Wrapper, Container, StyledButton }
