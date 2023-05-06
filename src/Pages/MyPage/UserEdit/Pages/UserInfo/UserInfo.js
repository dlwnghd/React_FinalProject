import styled from 'styled-components'
import { FlexAlignCSS, WidthAutoCSS } from '../../../../../Styles/common'
import Input from '../../../../../Components/Input/Input'
import Button from '../../../../../Components/Button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import userMock from '../../../../../__mock__/Data/User/user.data'
import { AlertText } from '../../../../../Components/AlertText/AlertText.style'
import { Camera_Icon } from '../../../../../Components/Icons/Icons'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../../../Atoms/modal.atom'
import Modal from '../../../../../Components/Modal/Modal'
import DaumPostCodeAddress from '../../../../../Components/DaumPostCodeAddress/DaumPostCodeAddress'
import addHyphenToPhoneNum from '../../../../../Utils/addHyphenToPhoneNum'

function UserInfo() {
	const {
		register,
		getValues,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			profile_img: userMock[0].profile_img,
			email: userMock[0].email,
			nickName: userMock[0].nickName,
			region: userMock[0].region,
			phone: userMock[0].phone,
		},
	})
	const [imgFile, setImgFile] = useState('')
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	const saveImgFile = e => {
		const file = e.target.files[0]
		console.log(file)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setImgFile(reader.result || null)
		}
	}

	const modalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsOpenModal(true)
	}

	const setRegion = str => {
		setValue('region', str)
	}

	const onSubmit = data => {
		console.log(data)
		const editUser = {
			email: data.email,
			nickName: data.nickName,
			phone: data.phone,
			region: data.region,
		}
		const editImg = {
			profile_img: data.profile_img,
		}
		console.log(editUser, editImg)
		// useCallback(() => {
		// 	axios({
		// 		method: 'post',
		// 		url: '/api/user',
		// 		headers: {
		// 			Authorization: `Bearer ${TokenService.getAccessToken()}`,
		// 		},
		// 	})
		// 		.then(response => {
		// 			console.log(response.data)
		// 		})
		// 		.catch(error => {
		// 			console.error(error)
		// 		})
		// })
	}

	return (
		<S.Wrapper>
			<FormProvider>
				<form onSubmit={handleSubmit(onSubmit)}>
					<S.InputBox>
						<S.ProfileImg
							src={
								imgFile
									? imgFile
									: 'https://static.nid.naver.com/images/web/user/default.png?type=s160'
							}
						/>
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
						<Input disabled {...register('email')} />
					</S.InputBox>
					<div>
						<S.InputBox>
							<S.Label>닉네임</S.Label>
							<Input
								status={errors.nickName && 'error'}
								{...register('nickName', {
									required: '닉네임을 입력해주세요',
								})}
							/>
						</S.InputBox>
						<S.StyledAlert type="error" size="default">
							{errors.nickName && errors.nickName.message}
						</S.StyledAlert>
					</div>
					<S.InputBox>
						<S.Label>주소</S.Label>
						<Input
							{...register('region', { required: true })}
							readOnly
							style={{ width: '80%' }}
						/>
						<S.RegisterButton
							shape={'square'}
							variant={'default-reverse'}
							onClick={modalOpen}
						>
							주소 찾기
						</S.RegisterButton>
						{isOpenModal && (
							<Modal size={'large'}>
								<h1>주소 검색</h1>
								<DaumPostCodeAddress setResultAddress={setRegion} />
							</Modal>
						)}
					</S.InputBox>
					<div>
						<S.InputBox>
							<S.Label>연락처</S.Label>
							<Input
								status={errors.phone && 'error'}
								{...register('phone', {
									required: '연락처를 입력해주세요',
									onChange: e =>
										setValue('phone', addHyphenToPhoneNum(e.target.value)),
								})}
							/>
						</S.InputBox>
						<S.StyledAlert type="error" size="default">
							{errors.phone && errors.phone.message}
						</S.StyledAlert>
					</div>
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
	SubmitButton,
}
