import React from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import { FlexCenterCSS } from '../../../Styles/common'
import getComponentsByPeriod from '../../../Utils/getComponentsByPeriod'

function AlertModal({ message }) {
	const formattedMsg = getComponentsByPeriod(message)

	return (
		<Modal size={'medium'}>
			<S.Container>
				<h3>NEGO MARKET</h3>
				<section>
					<S.Text>{formattedMsg}</S.Text>
				</section>
			</S.Container>
		</Modal>
	)
}
export default AlertModal

const Container = styled.div`
	${FlexCenterCSS}
	height: 100%;
	flex-direction: column;

	& > h3 {
		margin-bottom: 2rem;
		height: 10%;
		color: ${({ theme }) => theme.COLOR.main};
	}

	& > section {
		${FlexCenterCSS}
		height: 90%
	}
`
const Text = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	text-align: center;
	line-height: 3.4rem;
`

const S = { Container, Text }
