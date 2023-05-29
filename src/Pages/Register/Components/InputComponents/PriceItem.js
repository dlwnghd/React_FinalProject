import styled from 'styled-components'
import AlertText from '../../../../Components/AlertText/AlertText'
import { FlexAlignCSS } from '../../../../Styles/common'
import Input from '../../../../Components/Input/Input'
import Button from '../../../../Components/Button/Button'

function PriceItem(props) {
	const { errors, field, ...rest } = props

	return (
		<S.Wrapper>
			<S.InputField>
				<label>가격</label>
				<div>
					<Input
						placeholder={'가격을 입력해주세요.'}
						status={errors.price && 'error'}
						{...field}
						{...rest}
					/>
				</div>
			</S.InputField>

			<S.StyledAlertText type="error">
				{errors.price && errors.price.message}
			</S.StyledAlertText>
		</S.Wrapper>
	)
}
export default PriceItem

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

const S = { Wrapper, InputField, StyledAlertText, StyledButton }
