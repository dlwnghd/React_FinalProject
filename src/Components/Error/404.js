import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { GridCenterCSS } from '../../Styles/common'
import Button from '../Button/Button'
import ErrorCat from './Components/ErrorCat'

function Error404() {
	const navigate = useNavigate() // 네비게이션 추가

	return (
		<S.ErrorWrapper>
			<S.ErrorContainer>
				<p>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</p>
				<S.ButtonContents>
					<Button onClick={() => navigate('/')}>메인</Button>
					<Button onClick={() => navigate(-1)}>이전으로</Button>
				</S.ButtonContents>
			</S.ErrorContainer>
			<S.ErrorImageContainer>
				<ErrorCat />
			</S.ErrorImageContainer>
		</S.ErrorWrapper>
	)
}

export default Error404

const ErrorWrapper = styled.div`
	height: 100vh;
	${GridCenterCSS};
	background: #161616;
	justify-items: center;
	align-content: space-evenly;
`

const ErrorContainer = styled.div`
	text-align: center;
	color: white;
	display: grid;
	justify-items: center;
	row-gap: 10rem;

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};

		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			font-size: ${({ theme }) => theme.FONT_SIZE.small};
		}
	}
`

const ButtonContents = styled.div`
	display: flex;
	column-gap: 10rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		column-gap: 7rem;
	}
`

const ErrorImageContainer = styled.div``

const S = {
	ErrorWrapper,
	ErrorContainer,
	ButtonContents,
	ErrorImageContainer,
}
