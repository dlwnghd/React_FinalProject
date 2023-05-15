import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexCenterCSS,
	WidthAutoCSS,
} from '../../../../../Styles/common'
import Input from '../../../../../Components/Input/Input'
import Button from '../../../../../Components/Button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { AlertText } from '../../../../../Components/AlertText/AlertText.style'
import { Camera_Icon } from '../../../../../Components/Icons/Icons'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../../../Atoms/modal.atom'
import addHyphenToPhoneNum from '../../../../../Utils/addHyphenToPhoneNum'
import UserApi from '../../../../../Apis/userApi'
import { useEffect } from 'react'
import axios from 'axios'
import RegionModal from '../../../../../Components/Modal/RegionModal/RegionModal'
import Modal from '../../../../../Components/Modal/Modal'

function UserInfo() {
	const [userInfo, setUserInfo] = useState({})
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onChange',
	})
	const [imgFile, setImgFile] = useState('')
	const [preFile, setPreFile] = useState()
	const [isSubmit, setIsSubmit] = useState(false)
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)
	const [isDuplicate, setIsDuplicate] = useState({ state: null, message: '' })

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await UserApi.userInfo()
				setUserInfo({ ...data })
				setImgFile(data.profile_url)
				setPreFile(
					data.profile_url ||
						'https://static.nid.naver.com/images/web/user/default.png?type=s160',
				)
			} catch (err) {
				console.log(err)
			}
		}
		getData()
	}, [])

	const saveImgFile = e => {
		const file = e.target.files[0]
		setImgFile(file)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setPreFile(reader.result || null)
		}
	}

	const modalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsOpenModal(true)
	}

	const setRegion = str => {
		setValue('region', str)
	}

	const checkNickname = async e => {
		const nickName = e.target.value
		try {
			const res = await UserApi.checkNickname({ nickName })
			setIsDuplicate({ state: false, message: res.data.message })
		} catch (err) {
			if (err.response.status === 400) {
				setIsDuplicate({ state: true, message: err.response.data.message })
			}
			console.log(err)
		}
	}

	const onSubmit = async editData => {
		const formData = new FormData()
		formData.append('profile_url', imgFile)

		const editUser = {
			email: editData.email,
			nickName: editData.nickName,
			phone: editData.phone,
			region: editData.region,
		}
		setIsSubmit(true)
		try {
			await axios.all([
				UserApi.userEdit(editUser),
				UserApi.userEditProfile(formData),
			])
			setIsDuplicate({ state: false, message: '' })
			setIsOpenModal(true)
			setTimeout(() => {
				setIsOpenModal(false)
				setIsSubmit(false)
			}, 3000)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		setValue('email', userInfo.email)
		setValue('nickName', userInfo.nick_name)
		setValue('region', userInfo.region)
		setValue('phone', userInfo.phone)
	}, [userInfo])

	return (
		<S.Wrapper>
			<FormProvider>
				<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
					<S.InputBox>
						<S.ProfileImg src={preFile} />
						<S.ImgLabel htmlFor="profileImg">
							<Camera_Icon />
						</S.ImgLabel>
						<Input
							type="file"
							id="profileImg"
							accept="image/*"
							style={{ display: 'none' }}
							{...register('profile_img', {
								onChange: e => {
									saveImgFile(e)
								},
							})}
						/>
					</S.InputBox>
					<S.InputBox>
						<S.Label>아이디(이메일)</S.Label>
						<Input
							readOnly
							{...register('email')}
							defaultValue={userInfo.email}
						/>
					</S.InputBox>
					<div>
						<S.InputBox>
							<S.Label>닉네임</S.Label>
							<Input
								status={errors.nickName && 'error'}
								{...register('nickName', {
									required: {
										value: true,
										message: '닉네임을 입력해주세요',
									},
									onChange: e => checkNickname(e),
								})}
							/>
						</S.InputBox>
						<S.StyledAlert type="error" size="default">
							{errors.nickName && errors.nickName.message}
						</S.StyledAlert>
						{isDuplicate && (
							<S.StyledAlert
								type={isDuplicate.state ? 'error' : 'success'}
								size="default"
							>
								{isDuplicate.state !== null &&
									!errors.nickName &&
									isDuplicate.message}
							</S.StyledAlert>
						)}
					</div>
					<S.InputBox>
						<S.Label>주소</S.Label>
						<Input
							{...register('region', { required: true })}
							readOnly
							style={{ width: '80%' }}
						/>
						<S.RegisterButton
							type="button"
							shape={'square'}
							variant={'default-reverse'}
							onClick={modalOpen}
						>
							주소 찾기
						</S.RegisterButton>
						{!isSubmit && isOpenModal && <RegionModal setRegion={setRegion} />}
					</S.InputBox>
					<div>
						<S.InputBox>
							<S.Label>연락처</S.Label>
							<Input
								status={errors.phone && 'error'}
								{...register('phone', {
									required: {
										value: true,
										message: '연락처를 입력해주세요',
									},
									onChange: e =>
										setValue('phone', addHyphenToPhoneNum(e.target.value)),
								})}
							/>
						</S.InputBox>
						<S.StyledAlert type="error" size="default">
							{errors.phone && errors.phone.message}
						</S.StyledAlert>
					</div>
					{isSubmit && isOpenModal && (
						<S.StyledModal size="medium">
							<S.Text>프로필 수정이 완료되었습니다</S.Text>
						</S.StyledModal>
					)}
					<S.SubmitButton>변경</S.SubmitButton>
				</form>
			</FormProvider>
		</S.Wrapper>
	)
}

export default UserInfo

const Wrapper = styled.div`
	${WidthAutoCSS}
	width: 40%;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 95%;
	}
`

const InputBox = styled.div`
	${FlexAlignCSS}
	margin-bottom: 1.5rem;
`

const ImgLabel = styled.label`
	cursor: pointer;
	position: relative;
	right: 3.8rem;
	top: 2.4rem;
	width: 1.8rem;
	height: 1.8rem;
	border-radius: 50%;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
	background: ${({ theme }) => theme.COLOR.common.white};
`

const Label = styled.label`
	width: 25%;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		width: 30%;
	}
`

const ProfileImg = styled.img`
	border-radius: 50%;
	width: 7.2rem;
	height: 7.2rem;
	margin-right: 2rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
	background: ${({ theme }) => theme.COLOR.common.white};
`

const StyledAlert = styled(AlertText)`
	margin-left: 20%;
	padding-left: 0rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin-left: 23%;
	}
`

const RegisterButton = styled(Button)`
	width: 20%;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`
const StyledModal = styled(Modal)`
	${FlexCenterCSS}
`
const Text = styled.div`
	text-align: center;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const SubmitButton = styled(Button)`
	display: block;
	margin: auto;
	margin-bottom: 2rem;
	margin-top: 2rem;
`
const S = {
	Wrapper,
	InputBox,
	ImgLabel,
	Label,
	ProfileImg,
	StyledAlert,
	RegisterButton,
	StyledModal,
	Text,
	SubmitButton,
}
