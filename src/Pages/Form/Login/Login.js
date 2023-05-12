import { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import Button from '../../../Components/Button/Button'
import CheckBox from '../../../Components/CheckBox/CheckBox'

import { useForm } from 'react-hook-form'
import { FORM_TYPE } from '../../../Consts/form.type'
import AlertText from '../../../Components/AlertText/AlertText'

import UserApi from '../../../Apis/userApi'
import useUser from '../../../Hooks/useUser'
import { useRecoilValue } from 'recoil'
import { loginStateAtom } from '../../../Atoms/loginState.atom'
import UserInfoService from '../../../Utils/userInfoService'
import MESSAGE from '../../../Consts/message'

function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from

	const [isSaveId, setIsSaveId] = useState(false)
	const [error, setError] = useState(null)
	const loginState = useRecoilValue(loginStateAtom)
	const user = useUser()

	const {
		register,
		formState: { errors },
		setValue,
		watch,
		handleSubmit,
	} = useForm()

	const watchedEmail = watch('email')
	const watchedPassword = watch('password')

	const onSubmit = async data => {
		const { email, password: pw } = data

		try {
			const { data } = await UserApi.login({ email, pw })
			user.login(data.tokenForHeader, data.user)
			if (isSaveId) {
				// 로그인 성공 시에만 아이디 저장
				UserInfoService.setSaveId(email)
			}
			if (from) return navigate(from) // 이전 페이지 정보가 있다면 그 페이지로 돌아감
			navigate('/') // 그게 아니라면 메인 페이지로 이동
		} catch (err) {
			const { FAILURE, ERROR } = MESSAGE.LOGIN
			try {
				const {
					message: { info },
				} = err.response.data
				setError(info === 'loginFailed' ? FAILURE : ERROR)
			} catch (err) {
				// setError하는 과정에서 에러가 발생할 수 있어
				// 대비하여 ERROR로 텍스트를 띄웁니다.
				setError(ERROR)
			}
		}
	}

	useEffect(() => {
		const savedId = UserInfoService.getSavedId()
		if (savedId) {
			setValue('email', savedId)
		}
	}, [])

	useEffect(() => {
		setError(null)
	}, [watchedEmail, watchedPassword])

	if (loginState) return <Navigate replace to="/" /> // 이미 로그인 상태이면 메인페이지로 보내기

	return (
		<S.Wrapper>
			<S.Container>
				<h1>로그인</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<S.StyledInput
						type="text"
						placeholder="아이디(이메일)를 입력해주세요"
						status={errors.email && 'error'}
						{...register('email', FORM_TYPE.EMAIL_TYPE)}
					/>
					{errors.email && (
						<AlertText type={'error'}>{errors.email.message}</AlertText>
					)}
					<S.StyledInput
						type="password"
						placeholder="비밀번호를 입력해주세요 (8~16자의 영문자, 숫자, 특수문자 조합)"
						status={errors.password && 'error'}
						{...register('password', FORM_TYPE.PASSWORD_TYPE)}
					/>
					{errors.password && (
						<AlertText type={'error'}>{errors.password.message}</AlertText>
					)}
					{error && (
						<S.StyledAlertText type={'error'}>{error}</S.StyledAlertText>
					)}
					<div>
						<CheckBox
							id="saveId"
							onChange={() => setIsSaveId(prev => !prev)}
							value={isSaveId}
						/>
						<label htmlFor="saveId">아이디 저장</label>
					</div>
					<S.StyledButton type="submit" size={'full'} shape={'square'}>
						로그인
					</S.StyledButton>
				</form>
				<S.BottomBox>
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

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 80%;
	}

	& > h1 {
		font-size: ${({ theme }) => theme.FONT_SIZE.big};
		text-align: center;
	}

	& > form {
		margin-top: 3rem;
	}

	& > form > div {
		${FlexAlignCSS}
		margin-top: 1rem;
	}

	& > form > div > label {
		margin-left: 0.8rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`

const StyledInput = styled(Input)`
	margin-bottom: 1rem;
`

const StyledButton = styled(Button)`
	margin-top: 1rem;
`

const StyledAlertText = styled(AlertText)`
	text-align: center;
`

const BottomBox = styled.div`
	${FlexBetweenCSS}
	margin-top: 1rem;

	& > ul {
		margin-left: auto;
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
	StyledAlertText,
	BottomBox,
	StyledLink,
}
