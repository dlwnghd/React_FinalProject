import styled from 'styled-components'
import { FlexAlignCSS, WidthAutoCSS } from '../../../../../Styles/common'
import Input from '../../../../../Components/Input/Input'
import Button from '../../../../../Components/Button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import userMock from '../../../../../__mock__/Data/User/user.data'
import { AlertText } from '../../../../../Components/AlertText/AlertText.style'
import { Camera_Icon } from '../../../../../Components/Icons/Icons'

function UserInfo() {
	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			profile_img: userMock[0].profile_img,
			nickName: userMock[0].nickName,
			region: userMock[0].region,
			phone: userMock[0].phone,
		},
	})
	const [imgFile, setImgFile] = useState('')

	const saveImgFile = e => {
		const file = e.target.files[0]
		console.log(file)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setImgFile(reader.result || null)
		}
	}

	const onSubmit = data => {
		console.log(data)
		const editUser = {
			profile_img: data.profile_img,
			nickName: data.nickName,
			phone: data.phone,
			region: data.region,
		}
		console.log(editUser)
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
						<label>아이디(이메일)</label>
						<Input defaultValue={userMock[0].email} disabled />
					</S.InputBox>
					<div>
						<S.InputBox>
							<label>닉네임</label>
							<Input
								status={errors.nickName && 'error'}
								{...register('nickName', {
									required: '닉네임을 입력해주세요',
								})}
							/>
						</S.InputBox>
						<S.StyledAlert type="error" size="default">
							{errors.nickName?.type === 'required' && '닉네임을 입력해주세요'}
						</S.StyledAlert>
					</div>
					<S.InputBox>
						<label>주소</label>
						<Input
							{...register('region', { required: true })}
							readOnly
							style={{ width: '80%' }}
						/>
						<S.RegisterButton shape={'square'} variant={'default-reverse'}>
							주소 찾기
						</S.RegisterButton>
					</S.InputBox>
					<div>
						<S.InputBox>
							<label>연락처</label>
							<Input
								status={errors.phone && 'error'}
								{...register('phone', { required: '연락처를 입력해주세요' })}
							/>
						</S.InputBox>
						<S.StyledAlert type="error" size="default">
							{errors.phone?.type === 'required' && '연락처를 입력해주세요'}
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
`

const InputBox = styled.div`
	${FlexAlignCSS}
	margin-bottom: 1.5rem;

	& > label {
		width: 25%;
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	}
`

const ImgLabel = styled.label`
	cursor: pointer;
	width: auto;
`

const ProfileImg = styled.img`
	border-radius: 50%;
	width: 7.2rem;
	height: 7.2rem;
	margin-right: 2rem;
`

const StyledAlert = styled(AlertText)`
	margin-left: 20%;
	padding-left: 0rem;
`

const RegisterButton = styled(Button)`
	width: 20%;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`

const SubmitButton = styled(Button)`
	display: block;
	margin: auto;
	margin-bottom: 2rem;
`
const S = {
	Wrapper,
	InputBox,
	ImgLabel,
	ProfileImg,
	StyledAlert,
	RegisterButton,
	SubmitButton,
}
