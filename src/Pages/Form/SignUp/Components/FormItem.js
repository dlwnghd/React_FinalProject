import styled from 'styled-components'
import { AlertText } from '../../../../Components/AlertText/AlertText.style'
import Button from '../../../../Components/Button/Button'
import Input from '../../../../Components/Input/Input'
import { FlexAlignCSS } from '../../../../Styles/common'

const nameToLabel = {
	email: '아이디(이메일)',
	nickname: '닉네임',
	password: '비밀번호',
	passwordConfirm: '비밀번호 확인',
	region: '주소',
	phone: '연락처',
}

const nameToPlaceholder = {
	email: '아이디(이메일)을 입력해주세요',
	nickname: '2~10자 이내',
	password: '8~10자의 영문자, 숫자, 특수 문자 조합',
	passwordConfirm: '비밀번호 확인을 입력해주세요',
	region: '주소 검색을 해주세요',
	phone: '휴대폰 번호를 입력해주세요',
}
// 상품명, 가격, 상품설명, 거래지역
// 이걸로 못하는거 태그, 카테고리
function FormItem(props) {
	const {
		name,
		errors,
		field,
		isDuplicate,
		setIsOpenModal,
		setModalType,
		...rest
	} = props

	return (
		<S.Wrapper>
			<S.InputField>
				<label>{nameToLabel[name]}</label>
				<div>
					<Input
						type={name.includes('password') ? 'password' : 'text'}
						placeholder={nameToPlaceholder[name]}
						status={errors[name] || isDuplicate?.state ? 'error' : 'default'}
						readOnly={name === 'region'}
						{...field}
						{...rest}
					/>

					{/* name이 region일 때만 보여질 주소찾기 버튼입니다. */}
					{name === 'region' && (
						<S.StyledButton
							shape={'square'}
							variant={'default-reverse'}
							type="button"
							onClick={() => {
								setModalType('region')
								setIsOpenModal(true)
							}}
						>
							주소찾기
						</S.StyledButton>
					)}
				</div>
			</S.InputField>

			{errors[name] && (
				<S.StyledAlertText type="error">
					{errors[name].message}
				</S.StyledAlertText>
			)}

			{/* 중복 검사 관련 AlertText */}
			{/* isDuplicate 인자가 넘겨졌을 때만 보여집니다 */}
			{isDuplicate && (
				<S.StyledAlertText type={isDuplicate.state ? 'error' : 'success'}>
					{isDuplicate.state !== null && !errors[name] && isDuplicate.message}
				</S.StyledAlertText>
			)}
		</S.Wrapper>
	)
}
export default FormItem

const Wrapper = styled.div`
	height: 8.5rem;
`

const InputField = styled.div`
	${FlexAlignCSS}

	& > label {
		width: 19rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}

	& > div {
		width: 100%;
		position: relative;
		margin-left: auto;
		${FlexAlignCSS}
	}
`

const StyledAlertText = styled(AlertText)`
	margin-top: 0.3rem;
	font-size: 1.5rem;
	text-align: end;
`

const StyledButton = styled(Button)`
	margin-left: 1rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`

const S = {
	Wrapper,
	InputField,
	StyledAlertText,
	StyledButton,
}
