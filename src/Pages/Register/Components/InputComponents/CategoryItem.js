import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import AlertText from '../../../../Components/AlertText/AlertText'

function CategoryItem(props) {
	const { errors, field, ...rest } = props

	return (
		<div>
			<S.InputField>
				<label>카테고리 *</label>
				<S.InputValueCheckBox>
					<S.InputRadioWrap>
						<S.Radio
							type="radio"
							name="category"
							value={'1'}
							// {...field}
							{...rest}
						/>
						<S.Label>무료나눔</S.Label>
					</S.InputRadioWrap>
					<S.InputRadioWrap>
						<S.Radio
							type="radio"
							name="category"
							value={'0'}
							// {...field}
							{...rest}
						/>
						<S.Label>중고거래</S.Label>
					</S.InputRadioWrap>
				</S.InputValueCheckBox>
			</S.InputField>

			<S.StyledAlertText type="error">
				{errors.category && errors.category.message}
			</S.StyledAlertText>
		</div>
	)
}
export default CategoryItem
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
const InputValueCheckBox = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
	}
`
const InputRadioWrap = styled.div`
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
	}
`
const Radio = styled.input`
	accent-color: ${({ theme }) => theme.COLOR.common.gray[200]};
	width: 1.7rem;
	height: 1.7rem;
	margin: 0 2rem;
`
const Label = styled.label`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	margin-right: 2rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`
const StyledAlertText = styled(AlertText)`
	margin-top: 0.3rem;
	font-size: 1.5rem;
	text-align: end;
`
const S = {
	InputValueCheckBox,
	InputRadioWrap,
	Radio,
	Label,
	InputField,
	StyledAlertText,
}
