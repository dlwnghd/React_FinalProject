import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'

function SignUp() {
	return (
		<S.Wrapper>
			<h1>회원가입</h1>
			<S.Form>
				<div>
					<S.InputSection>
						<div>
							<label>아이디(이메일)</label>
							<div>
								<p>이메일을 입력해주세요</p>
								<Input />
							</div>
						</div>
						<div>
							<label>닉네임</label>
							<div>
								<p>2~10자 이내</p>
								<Input />
							</div>
						</div>
						<div>
							<label>비밀번호</label>
							<div>
								<p>10~16자의 영문자, 숫자, 특수 문자 조합</p>
								<Input type="password" />
							</div>
						</div>
						<div>
							<label>비밀번호 확인</label>
							<div>
								<Input type="password" />
							</div>
						</div>
						<div>
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
						</div>
						<div>
							<label>연락처</label>
							<div>
								<Input />
							</div>
						</div>
					</S.InputSection>
					<S.MapSection></S.MapSection>
				</div>
				<div>
					<Button>회원가입</Button>
				</div>
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

	& > div {
		${FlexBetweenCSS}
		align-items: flex-start;
	}

	& > div:last-child > button {
		margin: 0 auto;
	}
`

const InputSection = styled.section`
	width: 49%;

	@media screen and (max-width: 670px) {
		width: 90%;
	}

	& > div {
		${FlexAlignCSS}
		margin-bottom: 4rem;
	}

	& > div > label {
		width: 19rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}

	& > div > div {
		width: 45rem;
		position: relative;
		margin-left: auto;
		${FlexAlignCSS}
	}

	& > div > div > p {
		position: absolute;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		color: ${({ theme }) => theme.COLOR.common.gray[400]};
		right: 0;
		top: -2.4rem;

		@media screen and (max-width: 740px) {
			display: none;
		}
	}
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

const S = { Wrapper, Form, InputSection, StyledButton, MapSection }
