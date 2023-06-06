import styled from 'styled-components'
import Modal from '../Modal/Modal'
import { FlexCenterCSS } from '../../Styles/common'
import getErrorMessage from '../../Utils/getErrorMessage'
import getComponentsByPeriod from '../../Utils/getComponentsByPeriod'

function ErrorModal({ error }) {
	const status = error?.response?.status
	const { title, content } = getErrorMessage(status)
	const formattedContent = getComponentsByPeriod(content)

	return (
		<Modal size={'medium'}>
			<S.Container>
				<h3>{title}</h3>
				<section>
					<S.Content>{formattedContent}</S.Content>
				</section>
			</S.Container>
		</Modal>
	)
}

export default ErrorModal
const Container = styled.div`
	${FlexCenterCSS}
	height: 100%;
	flex-direction: column;

	& > h3 {
		margin-bottom: 2rem;
		height: 10%;
	}

	& > section {
		${FlexCenterCSS}
		height: 90%
	}
`
const Content = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	text-align: center;
	line-height: 3.4rem;
`
const S = {
	Container,
	Content,
}
