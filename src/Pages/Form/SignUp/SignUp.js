import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'
import { AlertText } from '../../../Components/AlertText/AlertText.style'

function SignUp() {
	return (
		<S.Wrapper>
			<h1>회원가입</h1>
			<S.Form onSubmit={handleSubmit(onSubmitSignup)}>
				<ul>
					<S.InputSection>
						<li>
							<S.InputBox>
								<label>아이디(이메일)</label>
								<Input
									type="text"
									placeholder="아이디(이메일)을 입력해주세요"
								/>
							</S.InputBox>
							<div></div>
						</li>

						<li>
							<S.InputBox>
								<label>닉네임</label>
								<Input placeholder="2~10자 이내" />
							</S.InputBox>
							<div></div>
						</li>
						<li>
							<S.InputBox>
								<label>비밀번호</label>
								<Input
									type="password"
									placeholder="10~16자의 영문자, 숫자, 특수 문자 조합"
								/>
							</S.InputBox>
							<div></div>
						</li>
						<li>
							<S.InputBox>
								<label>비밀번호 확인</label>
								<Input type="password" />
							</S.InputBox>
							<div></div>
						</li>
						<li>
							<S.InputBox>
								<label>주소</label>
								<div>
									<Input />
									<S.StyledButton
										shape={'square'}
										variant={'default-reverse'}
										type="button"
									>
										주소 찾기
									</S.StyledButton>
								</div>
							</S.InputBox>
							<div></div>
						</li>
						<li>
							<S.InputBox>
								<label>연락처</label>
								<Input />
							</S.InputBox>
							<div></div>
						</li>
					</S.InputSection>
					<S.MapSection></S.MapSection>
				</ul>
				<ul>
					<Button>회원가입</Button>
				</ul>
			</S.Form>
		</S.Wrapper>
	)
}

export default SignUp

const Wrapper = styled.div`
	${WidthAutoCSS}
	padding: 9rem 0;

	& > h1 {
		font-size: ${({ theme }) => theme.FONT_SIZE.big};
		text-align: center;
	}
`

const Form = styled.form`
	width: 100%;
	margin-top: 7rem;

	& > ul {
		${FlexBetweenCSS}
		align-items: flex-start;
	}

	& > ul:last-child > button {
		margin: 0 auto;
	}
`

const InputSection = styled.section`
	width: 49%;

	@media screen and (max-width: 670px) {
		width: 90%;
	}

	& > li {
		margin-bottom: 4rem;
	}

	& > li > div:last-child {
		text-align: end;
		margin-top: 0.3rem;
	}
`

const InputBox = styled.div`
	${FlexAlignCSS}

	& > label {
		width: 19rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}

	/* 주소 input + button */
	& > div {
		width: 100%;
		position: relative;
		margin-left: auto;
		${FlexAlignCSS}
	}
`

const StyledAlertText = styled(AlertText)`
	font-size: 1.5rem;
`

const StyledButton = styled(Button)`
	margin-left: 1rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`

const MapSection = styled.section`
	width: 49%;
	height: 50rem;
	background-color: gray;

	@media screen and (max-width: 670px) {
		display: none;
	}
`

const S = {
	Wrapper,
	Form,
	InputSection,
	InputBox,
	StyledAlertText,
	StyledButton,
	MapSection,
}
