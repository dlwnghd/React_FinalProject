import { WidthAutoCSS } from '../../../../../Styles/common'
import Input from '../../../../../Components/Input/Input'
import styled from 'styled-components'
import Button from '../../../../../Components/Button/Button'
import { FORM_TYPE } from '../../../../../Consts/form.type'
import { useForm } from 'react-hook-form'
import { AlertText } from '../../../../../Components/AlertText/AlertText.style'
import userMock from '../../../../../__mock__/Data/User/user.data'

function ChangePW() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	})
	const onSubmit = data => {
		console.log(data)
		const editUser = {
			pw: data.newPw,
		}
		console.log(editUser)
	}
	return (
		<S.Wrapper>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<S.StyledInput
						type="password"
						placeholder={'기존 비밀번호'}
						status={errors.pw && 'error'}
						{...register('pw', {
							validate: value =>
								value === userMock[0].pw || '기존 비밀번호를 입력해주세요',
						})}
					/>
					<AlertText type="error" size="default">
						{errors.pw && errors.pw.message}
					</AlertText>
				</div>
				<div>
					<S.StyledInput
						type="password"
						placeholder={
							'새로운 비밀번호(8~16자의 영문자, 숫자, 특수문자 조합)'
						}
						status={errors.newPw && 'error'}
						{...register('newPw', FORM_TYPE.PASSWORD_TYPE)}
					/>
					<AlertText type="error" size="default">
						{errors.newPw?.type === 'required' &&
							'새로운 비밀번호를 입력해주세요'}
						{errors.newPw?.type === 'minLength' && errors.newPw.message}
						{errors.newPw?.type === 'maxLength' && errors.newPw.message}
						{errors.newPw?.type === 'pattern' && errors.newPw.message}
					</AlertText>
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
					<AlertText type="error" size="default">
						{errors.newPwConfirm && errors.newPwConfirm.message}
					</AlertText>
				</div>
				<S.StyledButton>변경</S.StyledButton>
			</form>
		</S.Wrapper>
	)
}

export default ChangePW

const Wrapper = styled.div`
	${WidthAutoCSS}
	width: 30%;
`
const StyledInput = styled(Input)`
	margin-bottom: 1rem;
`
const StyledButton = styled(Button)`
	display: block;
	margin: auto;
	margin-bottom: 2rem;
`

const S = {
	Wrapper,
	StyledInput,
	StyledButton,
}
