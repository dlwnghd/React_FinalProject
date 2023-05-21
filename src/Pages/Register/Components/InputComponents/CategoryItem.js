import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import AlertText from '../../../../Components/AlertText/AlertText'

function CategoryItem(props) {
	const { errors, name, field, checkedCategory, ...rest } = props

	//name이 무료 혹은 중고 이런식으로 온다.
	const nameToLabel = {
		무료: '무료나눔',
		중고: '중고거래',
	}

	// const id = {
	// 	: '상품 제목을 입력해주세요.',
	// 	description: '상품 설명을 입력해주세요.',
	// }

	return (
		<div>
			<S.InputField>
				{name === '무료' && <label>카테고리 *</label>}
				<S.InputValueCheckBox>
					<S.InputRadioWrap>
						<S.Radio
							id={name}
							type="radio"
							name="category"
							{...field}
							{...rest}
						/>
						<S.Label htmlFor={name}>{nameToLabel[name]}</S.Label>
					</S.InputRadioWrap>
				</S.InputValueCheckBox>
			</S.InputField>
		</div>
	)
}
export default CategoryItem
const InputField = styled.div`
	${FlexAlignCSS}

	& > label {
		width: 17rem;

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
	width: 100%;
`
const S = {
	InputValueCheckBox,
	InputRadioWrap,
	Radio,
	Label,
	InputField,
	StyledAlertText,
}
