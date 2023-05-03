import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'
import { Controller, useForm } from 'react-hook-form'
import { AlertText } from '../../../Components/AlertText/AlertText.style'
import { FORM_TYPE } from '../../../Consts/form.type'
import { useState } from 'react'

function SignUp() {
	const [isDuplicateNickname, setIsDuplicateNickname] = useState(false)
	const {
		control,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const onSubmitSignup = () => {
		// ...
	}

	const onCheckDuplicateNickName = e => {
		// 닉네임 중복검사 api 요청 후 처리
		// setIsDuplicateNickname(true)
	}

	return (
		<S.Wrapper>
			<h1>회원가입</h1>
			<S.Form onSubmit={handleSubmit(onSubmitSignup)}>
				<ul>
					<S.InputSection>
						<Controller
							name="email"
							control={control}
							rules={FORM_TYPE.EMAIL_TYPE}
							render={({ field }) => (
								<li>
									<S.InputBox>
										<label>아이디(이메일)</label>
										<Input
											type="text"
											placeholder="아이디(이메일)을 입력해주세요"
											{...field}
											status={errors.email && 'error'}
										/>
									</S.InputBox>
									<div>
										{errors.email && (
											<S.StyledAlertText type="error">
												{errors.email.message}
											</S.StyledAlertText>
										)}
									</div>
								</li>
							)}
						></Controller>
						<Controller
							name="nickName"
							control={control}
							rules={FORM_TYPE.NICKNAME_TYPE}
							render={({ field }) => (
								<li>
									<S.InputBox>
										<label>닉네임</label>
										<Input
											type="text"
											placeholder="2~10자 이내"
											status={
												errors.nickName || isDuplicateNickname
													? 'error'
													: 'default'
											}
											{...field}
											onBlur={onCheckDuplicateNickName}
										/>
									</S.InputBox>
									<div>
										{errors.nickName && (
											<S.StyledAlertText type="error">
												{errors.nickName.message}
											</S.StyledAlertText>
										)}
										{isDuplicateNickname && (
											<S.StyledAlertText type="error">
												중복된 닉네임입니다
											</S.StyledAlertText>
										)}
									</div>
								</li>
							)}
						></Controller>
						<Controller
							name="password"
							control={control}
							rules={FORM_TYPE.PASSWORD_TYPE}
							render={({ field }) => (
								<li>
									<S.InputBox>
										<label>비밀번호</label>
										<Input
											type="password"
											placeholder="10~16자의 영문자, 숫자, 특수 문자 조합"
											{...field}
											status={errors.password && 'error'}
										/>
									</S.InputBox>
									<div>
										{errors.password && (
											<S.StyledAlertText type="error">
												{errors.password.message}
											</S.StyledAlertText>
										)}
									</div>
								</li>
							)}
						></Controller>
						<Controller
							name="passwordConfirm"
							control={control}
							rules={{
								required: '비밀번호 확인을 입력해주세요',
								validate: value =>
									value === watch('password') ||
									'입력한 비밀번호와 일치하지 않습니다',
							}}
							render={({ field }) => (
								<li>
									<S.InputBox>
										<label>비밀번호 확인</label>
										<Input
											type="password"
											{...field}
											status={errors.passwordConfirm && 'error'}
										/>
									</S.InputBox>
									<div>
										{errors.passwordConfirm && (
											<S.StyledAlertText type="error">
												{errors.passwordConfirm.message}
											</S.StyledAlertText>
										)}
									</div>
								</li>
							)}
						></Controller>
						<Controller
							name="region"
							control={control}
							rules={{ required: '주소를 입력해주세요' }}
							render={({ field }) => (
								<li>
									<S.InputBox>
										<label>주소</label>
										<div>
											<Input
												type="text"
												status={errors.region && 'error'}
												{...field}
											/>
											<S.StyledButton
												shape={'square'}
												variant={'default-reverse'}
												type="button"
											>
												주소 찾기
											</S.StyledButton>
										</div>
									</S.InputBox>
									<div>
										{errors.region && (
											<S.StyledAlertText type="error">
												{errors.region.message}
											</S.StyledAlertText>
										)}
									</div>
								</li>
							)}
						></Controller>
						<Controller
							name="phone"
							control={control}
							rules={FORM_TYPE.PHONE_TYPE}
							render={({ field }) => (
								<li>
									<S.InputBox>
										<label>연락처</label>
										<Input
											type="text"
											maxLength="13"
											{...field}
											status={errors.phone && 'error'}
											onChange={e => console.log(e.target.value)}
										/>
									</S.InputBox>
									<div>
										{errors.phone && (
											<S.StyledAlertText type="error">
												{errors.phone.message}
											</S.StyledAlertText>
										)}
									</div>
								</li>
							)}
						></Controller>
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
		margin: 5rem auto;
	}
`

const InputSection = styled.section`
	width: 49%;

	@media screen and (max-width: 670px) {
		width: 90%;
	}

	& > li {
		margin-bottom: 2.8rem;
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
	height: 44rem;
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
