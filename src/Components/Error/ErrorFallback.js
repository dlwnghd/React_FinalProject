import { useNavigate } from 'react-router-dom'
import getErrorMessage from '../../Utils/getErrorMessage'
import styled from 'styled-components'
import { FlexCenterCSS, WidthAutoCSS } from '../../Styles/common'
import Button from '../Button/Button'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

function ErrorFallback({ error }) {
	const { reset } = useQueryErrorResetBoundary()

	const status = error.response?.status
	const navigate = useNavigate()
	const { title, content } = getErrorMessage(status)
	const isExpiredSession = status === 403
	const buttonMessage = isExpiredSession ? '로그인 하러가기' : '새로고침'

	const onClickHandler = () => {
		if (isExpiredSession) {
			navigate('/login')
		} else {
			reset()
		}
	}

	return (
		<S.Wrapper>
			<S.Container>
				<h1>{title}</h1>
				<p>{content}</p>
				<Button shape={'soft'} onClick={onClickHandler}>
					{buttonMessage}
				</Button>
			</S.Container>
		</S.Wrapper>
	)
}
export default ErrorFallback

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const Container = styled.div`
	padding: 20rem 0;
	${FlexCenterCSS}
	flex-direction: column;

	& > h1 {
		margin-bottom: 2rem;
	}

	& > p {
		margin-bottom: 0.6rem;
	}
`
const S = { Wrapper, Container }
