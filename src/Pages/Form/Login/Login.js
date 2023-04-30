import styled from 'styled-components'
import {
	FlexBetweenCSS,
	FlexCenterCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
	const navigate = useNavigate()

	return (
		<S.Wrapper>
			<S.Container>
				<h1>로그인</h1>
				<form>
					<S.StyledInput type="text" placeholder="아이디를 입력해주세요" />
					<S.StyledInput
						type="password"
						placeholder="비밀번호를 입력해주세요 (8~16자의 영문자, 숫자 조합)"
					/>
					<S.StyledButton type="button" size={'full'} shape={'square'}>
						로그인
					</S.StyledButton>
				</form>
				<S.BottomBox>
					<div>
						<input type="checkbox" />
						<label>아이디 저장</label>
					</div>
					<ul>
						<li>아이디 찾기</li>
						<li>비밀번호 찾기</li>
						<li onClick={() => navigate('/signup')}>회원가입</li>
					</ul>
				</S.BottomBox>
			</S.Container>
		</S.Wrapper>
	)
}

export default Login

const Wrapper = styled.div`
	${WidthAutoCSS};
	${FlexCenterCSS};
`
const Container = styled.div`
	width: 45%;
	padding: 9rem 0;

	& > h1 {
		font-size: ${({ theme }) => theme.FONT_SIZE.big};
		text-align: center;
	}

	& > form {
		margin-top: 3rem;
	}
`

const StyledInput = styled(Input)`
	margin-bottom: 1rem;
`

const StyledButton = styled(Button)`
	margin-top: 1rem;
`

const BottomBox = styled.div`
	${FlexBetweenCSS}
	margin-top: 1.7rem;

	& > div:first-child {
		@media screen and (max-width: 600px) {
			display: none;
		}
	}

	& > div > label {
		margin-left: 0.8rem;
		padding-top: 0.46rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}

	& > ul > li {
		display: inline-block;
		margin-left: 1rem;
		position: relative;
		cursor: pointer;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}

	& > ul > li:first-child {
		margin-left: 0;
	}

	& > ul > li:last-child::before,
	li:first-child::after {
		content: '';
		position: absolute;
		right: 5.3rem;
		top: 30%;
		height: 8px;
		width: 1px;
		margin-top: -2px;
		background: #dbdbdb;
		cursor: default;
	}

	& > ul > li:first-child::after {
		right: 0;
		left: 7rem;
	}
`

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	margin-left: 0.8rem;
	padding-top: 0.46rem;
`

const S = {
	Wrapper,
	Container,
	StyledInput,
	StyledButton,
	BottomBox,
	StyledLink,
}
