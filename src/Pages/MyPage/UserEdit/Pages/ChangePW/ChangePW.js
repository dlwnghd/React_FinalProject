import { FlexCenterCSS, WidthAutoCSS } from '../../../../../Styles/common'
import Input from '../../../../../Components/Input/Input'
import styled from 'styled-components'
import Button from '../../../../../Components/Button/Button'
import { FORM_TYPE } from '../../../../../Consts/form.type'
import { useForm } from 'react-hook-form'
import { AlertText } from '../../../../../Components/AlertText/AlertText.style'
import UserApi from '../../../../../Apis/userApi'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../../../Atoms/modal.atom'
import Modal from '../../../../../Components/Modal/Modal'

function ChangePW() {
	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	})
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	const onSubmit = async data => {
		try {
			await UserApi.userEditPw({ pw: data.newPw })
			setIsOpenModal(true)
			setTimeout(() => setIsOpenModal(false), 3000)
			setValue('newPw', '')
			setValue('newPwConfirm', '')
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<S.Wrapper>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<S.StyledInput
						type="password"
						placeholder={
							'새로운 비밀번호(8~16자의 영문자, 숫자, 특수문자 조합)'
						}
						status={errors.newPw && 'error'}
						{...register('newPw', FORM_TYPE.PASSWORD_TYPE)}
					/>
					<S.StyledAlert type="error" size="default">
						{errors.newPw?.type === 'required' &&
							'새로운 비밀번호를 입력해주세요'}
						{errors.newPw?.type !== 'required' &&
							errors.newPw &&
							errors.newPw.message}
					</S.StyledAlert>
				</div>
				<div>
					<S.StyledInput
						type="password"
						placeholder={'새로운 비밀번호 확인'}
						status={errors.newPwConfirm && 'error'}
						{...register('newPwConfirm', {
							required: '새로운 비밀번호 확인을 입력해주세요',
							validate: value =>
								value === watch('newPw') ||
								'입력한 비밀번호와 일치하지 않습니다',
						})}
					/>
					<S.StyledAlert type="error" size="default">
						{errors.newPwConfirm && errors.newPwConfirm.message}
					</S.StyledAlert>
				</div>
				{isOpenModal && (
					<S.StyledModal size="medium">
						<S.Text>비밀번호 변경이 완료되었습니다</S.Text>
					</S.StyledModal>
				)}
				<S.StyledButton>변경</S.StyledButton>
			</form>
		</S.Wrapper>
	)
}

export default ChangePW

const Wrapper = styled.div`
	${WidthAutoCSS}
	width: 30%;
	padding: 7rem 0;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 95%;
		padding: 0;
	}
`
const StyledInput = styled(Input)`
	margin-bottom: 1rem;
`
const StyledAlert = styled(AlertText)`
	padding-left: 0rem;
`
const StyledModal = styled(Modal)`
	${FlexCenterCSS}
`
const Text = styled.div`
	text-align: center;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const StyledButton = styled(Button)`
	display: block;
	margin: auto;
	margin-bottom: 2rem;
	margin-top: 2rem;
`

const S = {
	Wrapper,
	StyledInput,
	StyledButton,
	StyledModal,
	Text,
	StyledAlert,
}
