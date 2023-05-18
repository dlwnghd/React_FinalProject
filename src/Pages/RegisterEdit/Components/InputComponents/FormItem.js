import styled from 'styled-components'
import AlertText from '../../../../Components/AlertText/AlertText'
import { FlexAlignCSS } from '../../../../Styles/common'
import Input from '../../../../Components/Input/Input'
import Button from '../../../../Components/Button/Button'
import { statusCSS } from '../../../../Components/Input/Input.style'

const nameToLabel = {
	title: '상품명 *',
	description: '상품 설명 *',
	region: '주소',
}

const nameToPlaceholder = {
	title: '상품 제목을 입력해주세요.',
	description: '상품 설명을 입력해주세요.',
	region: '주소 검색을 해주세요',
}

function FormItem(props) {
	const { name, errors, field, setIsOpenModal, setModalType, ...rest } = props

	return (
		<S.Wrapper>
			<S.InputField>
				<label>{nameToLabel[name]}</label>
				<div>
					{name !== 'description' ? (
						<Input
							placeholder={nameToPlaceholder[name]}
							status={errors[name] ? 'error' : 'default'}
							{...field}
							{...rest}
						/>
					) : (
						<S.Textarea
							placeholder={nameToPlaceholder[name]}
							status={errors[name] ? 'error' : 'default'}
							{...field}
							{...rest}
						/>
					)}

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

			<S.StyledAlertText type="error">
				{errors[name] && errors[name].message}
			</S.StyledAlertText>
		</S.Wrapper>
	)
}
export default FormItem

const Wrapper = styled.div`
	margin-bottom: 2.8rem;
`

const InputField = styled.div`
	${FlexAlignCSS}

	& > label {
		width: 14rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
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

const Textarea = styled.textarea`
	width: 100%;
	height: 30rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	padding: 1rem 1.2rem;
	${({ status }) => statusCSS[status]};
`
const S = { Wrapper, InputField, StyledAlertText, StyledButton, Textarea }
