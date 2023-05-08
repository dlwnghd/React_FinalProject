import styled from 'styled-components'
import { FlexCenterCSS, WidthAutoCSS } from '../../Styles/common'
import getErrorMessage from '../../Utils/getErrorMessage'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Button/Button'

function ErrorFallback({ error, resetErrorBoundary }) {
	const navigate = useNavigate()

	console.log('여기는 ErrorFallback', error)

	const { status } = error.response
	const { title, content } = getErrorMessage(status)
	const isNotAuthorized = status === 401 || status === 403
	const buttonMessage = isNotAuthorized ? '로그인 하러 가기' : '새로고침'

	const onClickHandler = () => {
		if (isNotAuthorized) {
			navigate('/login')
		} else {
			resetErrorBoundary()
		}
	}

	return (
		<S.Wrapper>
			<h1>{title}</h1>
			<p>{content}</p>
			<Button onClick={onClickHandler} shape={'square'}>
				{buttonMessage}
			</Button>
		</S.Wrapper>
	)
}
export default ErrorFallback

const Wrapper = styled.div`
	${WidthAutoCSS}
	${FlexCenterCSS}
	flex-direction: column;
	padding: 13.5rem 0rem;

	& > h1 {
		margin-bottom: 1rem;
	}

	& > p {
		margin-bottom: 4rem;
	}
`

const S = { Wrapper }
