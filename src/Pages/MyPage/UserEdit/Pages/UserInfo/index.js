import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexCenterCSS,
	WidthAutoCSS,
} from '../../../../../Styles/common'
import Input from '../../../../../Components/Input/Input'
import Button from '../../../../../Components/Button/Button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { AlertText } from '../../../../../Components/AlertText/AlertText.style'
import { Camera_Icon } from '../../../../../Components/Icons/Icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isOpenModalAtom } from '../../../../../Atoms/modal.atom'
import addHyphenToPhoneNum from '../../../../../Utils/addHyphenToPhoneNum'
import UserApi from '../../../../../Apis/userApi'
import { useEffect } from 'react'
import RegionModal from '../../../../../Components/Modal/RegionModal/RegionModal'
import Modal from '../../../../../Components/Modal/Modal'
import MESSAGE from '../../../../../Consts/message'
import useGetUserInfo from '../../../../../Hooks/Queries/get-userInfo'
import UserInfoSkeleton from './Components/UserInfoSkeleton'
import ErrorFallback from '../../../../../Components/Error/ErrorFallback'
import AlertModal from '../../../../../Components/Modal/AlertModal/AlertModal'
import ErrorModal from '../../../../../Components/Error/ErrorModal'
import { useMutation } from '@tanstack/react-query'
import useUser from '../../../../../Hooks/useUser'
import { userInfoAtom } from '../../../../../Atoms/userInfo.atom'
import axios from 'axios'
// import useUser from '../../../../../Hooks/useUser'
// import { userInfoAtom } from '../../../../../Atoms/userInfo.atom'

function UserInfo() {
	const {
		data,
		error: getError,
		status: getStatus,
		isLoading,
	} = useGetUserInfo()
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onChange',
	})
	const [userInfo, setUserInfo] = useState({})
	const [imgFile, setImgFile] = useState()
	const [preFile, setPreFile] = useState()
	const [modalType, setModalType] = useState('')
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)
	const [isDuplicate, setIsDuplicate] = useState({ state: null, message: '' })
	const [message, setMessage] = useState(MESSAGE.USEREDIT.SUCCESS)

	const user = useUser()
	const userAtomInfo = useRecoilValue(userInfoAtom)

	useEffect(() => {
		setUserInfo({ ...data })
	}, [data])

	const {
		mutateAsync,
		error: updateError,
		status: updateState,
	} = useMutation(
		async ({ email, nickName, phone, region, profile_url }) =>
			await axios.all([
				UserApi.userEdit({ email, nickName, phone, region }),
				profile_url && UserApi.userEditProfile(profile_url),
			]),

		{
			onSuccess: res => {
				console.log(res)
				const editData = JSON.parse(res[0].config.data)
				if (res[1]) {
					user.editUserInfo({
						email: editData.email,
						nickName: editData.nickName,
						profileUrl: res[1].data.profile_url,
						region: editData.region,
						socket: userAtomInfo.socket,
					})
				} else {
					user.editUserInfo({
						email: editData.email,
						nickName: editData.nickName,
						profileUrl: userAtomInfo.profileUrl,
						region: editData.region,
						socket: userAtomInfo.socket,
					})
				}
				setModalType('submit')
				setMessage(MESSAGE.USEREDIT.SUCCESS)
				setIsDuplicate({ state: false, message: '' })
				setIsOpenModal(true)
				setTimeout(() => {
					setIsOpenModal(false)
					setModalType('')
				}, 3000)
				// client.invalidateQueries(
				// 	[QUERY_KEY.GET_USER_INFO],
				// 	[QUERY_KEY.GET_MYPAGE_MAIN_DATA],
				// )
			},
			onError: err => {
				console.log(err)
				setModalType('error')
				setIsOpenModal(true)
			},
		},
	)

	const saveImgFile = e => {
		const file = e.target.files[0]
		setImgFile(file)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setPreFile(reader.result || null)
		}
	}

	const addressModalOpen = () => {
		document.body.style.overflow = 'hidden'
		setModalType('address')
		setIsOpenModal(true)
	}

	const setRegion = str => {
		setValue('region', str)
		setModalType('')
	}

	const checkNickname = async e => {
		const nickname = e.target.value
		setIsDuplicate({ state: false, message: '' })
		if (userInfo.nick_name !== nickname) {
			try {
				const res = await UserApi.checkNickname({ nickname })
				setIsDuplicate({ state: false, message: res.data.message })
			} catch (err) {
				if (err.response.status === 400) {
					setIsDuplicate({ state: true, message: err.response.data.message })
				}
			}
		}
	}
	const onSubmit = async editData => {
		let formData
		if (imgFile) {
			formData = new FormData()
			formData.append('profile_url', imgFile)
		}
		const editUser = {
			email: editData.email,
			nickName: editData.nickName,
			phone: editData.phone,
			region: editData.region,
			profile_url: formData,
		}

		try {
			mutateAsync(editUser)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		setPreFile(
			userInfo.profile_url ||
				'https://static.nid.naver.com/images/web/user/default.png?type=s160',
		)
		setValue('email', userInfo.email)
		setValue('nickName', userInfo.nick_name)
		setValue('region', userInfo.region)
		setValue('phone', userInfo.phone)
	}, [userInfo])

	if (getStatus === 'loading') {
		return <UserInfoSkeleton />
	}

	if (getError) {
		return <ErrorFallback error={getError} />
	}

	return (
		<S.Wrapper>
			{isOpenModal && modalType === 'error' && (
				<ErrorModal error={updateError} />
			)}
			<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
				<S.Container>
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
				</S.Container>
				<S.Container>
					<S.InputBox>
						<S.Label>아이디(이메일)</S.Label>
						<Input readOnly {...register('email')} />
					</S.InputBox>
				</S.Container>
				<S.Container>
					<S.InputBox>
						<S.Label>닉네임</S.Label>
						<Input
							status={errors.nickName && 'error'}
							{...register('nickName', {
								required: {
									value: true,
									message: '닉네임을 입력해주세요',
								},
								onBlur: e => checkNickname(e),
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
							style={{ position: 'relative' }}
						>
							{isDuplicate.state !== null &&
								!errors.nickName &&
								isDuplicate.message}
						</S.StyledAlert>
					)}
				</S.Container>
				<S.Container>
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
							onClick={addressModalOpen}
						>
							주소 찾기
						</S.RegisterButton>
						{modalType === 'address' && isOpenModal && (
							<RegionModal setResultAddress={setRegion} />
						)}
					</S.InputBox>
				</S.Container>
				<S.Container>
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
				</S.Container>
				{updateState === 'success' && modalType === 'submit' && isOpenModal && (
					<AlertModal message={message} />
				)}
				<S.SubmitButton>변경</S.SubmitButton>
			</form>
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
const Container = styled.div`
	height: 8rem;
`
const InputBox = styled.div`
	${FlexAlignCSS}
	margin-bottom: 0.5rem;
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
	margin-bottom: 0;
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
	Container,
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
