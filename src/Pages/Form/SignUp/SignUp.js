import styled from 'styled-components'
import { FlexBetweenCSS, WidthAutoCSS } from '../../../Styles/common'
import Button from '../../../Components/Button/Button'
import { Controller, useForm } from 'react-hook-form'
import { FORM_TYPE } from '../../../Consts/form.type'
import { useState } from 'react'
import { useEffect } from 'react'
import UserApi from '../../../Apis/userApi'
import { useNavigate } from 'react-router-dom'
import FormItem from './Components/FormItem'
import addHyphenToPhoneNum from '../../../Utils/addHyphenToPhoneNum'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../Atoms/modal.atom'

import RegionModal from '../../../Components/Modal/RegionModal/RegionModal'
import UserInfoService from '../../../Utils/userInfoService'
import AlertModal from '../../../Components/Modal/AlertModal/AlertModal'
import MESSAGE from '../../../Consts/message'

function SignUp() {
	const navigate = useNavigate()
	const [modalType, setModalType] = useState('')
	const [isDuplicate, setIsDuplicate] = useState({
		email: { state: null, message: '' },
		nickname: { state: null, message: '' },
	})
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	const {
		control,
		watch,
		setValue,
		formState: { errors },
		handleSubmit,
		clearErrors,
	} = useForm({ mode: 'onChange' })

	const watchedEmail = watch('email')

	const watchedNickname = watch('nickname')

	const onSubmitSignup = async data => {
		if (isDuplicate.email.state || isDuplicate.nickname.state) return

		const newUser = {
			email: data.email,
			pw: data.password,
			nickName: data.nickname,
			phone: data.phone,
			region: data.region,
		}

		try {
			await UserApi.signup(newUser)
			UserInfoService.setSaveId(newUser.email)
			navigate('/login')
		} catch (err) {
			if (err.response.status === 400) {
				setModalType('error')
				setIsOpenModal(true)
			}
		}
	}

	const onCheckDuplicate = async (e, type) => {
		const value = e.target.value

		if (!value || errors[type]) {
			setIsDuplicate(prev => ({
				...prev,
				[type]: { state: null, message: '' },
			}))
			return
		}

		const checkApi =
			type === 'email' ? UserApi.checkEmail : UserApi.checkNickname

		try {
			const res = await checkApi({ [type]: value })
			setIsDuplicate(prev => ({
				...prev,
				[type]: { state: false, message: res.data.message },
			}))
		} catch (err) {
			if (err.response.status === 400) {
				setIsDuplicate(prev => ({
					...prev,
					[type]: { state: true, message: err.response.data.message },
				}))
			}
		}
	}

	// 입력한 내용이 달라지면 중복검사 했던 내용 초기화
	useEffect(() => {
		setIsDuplicate(prev => ({
			...prev,
			email: { state: null, message: '' },
		}))
	}, [watchedEmail])

	useEffect(() => {
		setIsDuplicate(prev => ({
			...prev,
			nickname: { state: null, message: '' },
		}))
	}, [watchedNickname])

	const setRegion = result => {
		setValue('region', result)
		clearErrors('region')
	}

	return (
		<S.Wrapper>
			{isOpenModal && modalType === 'alert' && (
				<AlertModal message={MESSAGE.JOIN.FAILURE} />
			)}
			<h1>회원가입</h1>
			<S.Form onSubmit={handleSubmit(onSubmitSignup)}>
				<div>
					<S.InputSection>
						<Controller
							name="email"
							control={control}
							rules={FORM_TYPE.EMAIL_TYPE}
							render={({ field }) => (
								<FormItem
									name={'email'}
									errors={errors}
									field={field}
									isDuplicate={isDuplicate.email}
									onBlur={e => onCheckDuplicate(e, 'email')}
								/>
							)}
						></Controller>
						<Controller
							name="nickname"
							control={control}
							rules={FORM_TYPE.NICKNAME_TYPE}
							render={({ field }) => (
								<FormItem
									name={'nickname'}
									errors={errors}
									field={field}
									isDuplicate={isDuplicate.nickname}
									onBlur={e => onCheckDuplicate(e, 'nickname')}
								/>
							)}
						></Controller>
						<Controller
							name="password"
							control={control}
							rules={FORM_TYPE.PASSWORD_TYPE}
							render={({ field }) => (
								<FormItem name={'password'} errors={errors} field={field} />
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
								<FormItem
									name={'passwordConfirm'}
									errors={errors}
									field={field}
								/>
							)}
						></Controller>
						<Controller
							name="region"
							control={control}
							rules={{ required: '주소를 입력해주세요' }}
							render={({ field }) => (
								<FormItem
									name={'region'}
									errors={errors}
									field={field}
									setIsOpenModal={setIsOpenModal}
									setModalType={setModalType}
								/>
							)}
						></Controller>
						{isOpenModal && modalType === 'region' && (
							<RegionModal setRegion={setRegion} />
						)}
						<Controller
							name="phone"
							control={control}
							rules={FORM_TYPE.PHONE_TYPE}
							render={({ field }) => (
								<FormItem
									name={'phone'}
									errors={errors}
									field={field}
									onBlur={e =>
										setValue('phone', addHyphenToPhoneNum(field.value))
									}
								/>
							)}
						></Controller>
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

		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			text-align: center;
		}
	}

	& > div > button {
		margin: 5rem auto;
	}
`

const InputSection = styled.section`
	width: 49%;

	@media screen and (max-width: 670px) {
		width: 90%;
	}
`

const MapSection = styled.section`
	width: 49%;
	height: 47.5rem;
	background-color: gray;

	@media screen and (max-width: 670px) {
		display: none;
	}
`

const S = {
	Wrapper,
	Form,
	InputSection,
	MapSection,
}
