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
				<Button children={'돌아가기'} />
			</S.ErrorContainer>
			<S.ErrorImageContainer>
				<ErrorCat />
			</S.ErrorImageContainer>
		</S.ErrorWrapper>
	)
}

export default Error404

const ErrorWrapper = styled.div`
	height: 80rem;
	${GridCenterCSS};
	background: #161616;
	justify-items: center;
	align-content: space-evenly;

	@media screen and (max-width: 440px) {
		height: 70rem;
	}
`

const ErrorContainer = styled.div`
	text-align: center;
	color: white;

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};

		@media screen and (max-width: 440px) {
			font-size: ${({ theme }) => theme.FONT_SIZE.small};
		}
	}
`

const ErrorImageContainer = styled.div``

const S = {
	ErrorWrapper,
	ErrorContainer,
	ErrorImageContainer,
}
