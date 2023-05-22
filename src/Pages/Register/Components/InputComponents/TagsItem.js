import styled from 'styled-components'

import { ModalClose_icon } from '../../../../Components/Icons/Icons'
import { FlexAlignCSS } from '../../../../Styles/common'
import Input from '../../../../Components/Input/Input'
import AlertText from '../../../../Components/AlertText/AlertText'

function TagsItem(props) {
	const { errors, field, hashArr, deleteTagItem, ...rest } = props

	return (
		<div>
			<S.InputField>
				<label>태그 *</label>
				<S.TagBox>
					{hashArr.map((hash, idx) => (
						<S.TagItem key={idx}>
							<div>{hash}</div>
							<S.DelButton onClick={() => deleteTagItem(hash)}>
								<ModalClose_icon size={17} />
							</S.DelButton>
						</S.TagItem>
					))}
					<S.StyledInput
						placeholder="태그를 ,(콤마)와 함께 입력해주세요."
						status={errors.hash ? 'error' : 'default'}
						{...field}
						{...rest}
					/>
				</S.TagBox>
			</S.InputField>

			<S.StyledAlertText type="error">
				{errors.hash && errors.hash.message}
			</S.StyledAlertText>
		</div>
	)
}
export default TagsItem

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

const TagBox = styled.div`
	grid-column-start: 2;
	grid-column-end: 11;
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	&:focus-within {
		border-color: tomato;
	}
`
const TagItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0.5rem;
	padding: 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 5px;
	color: white;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`

const DelButton = styled.button`
	width: 1.7rem;
	height: 1.7rem;
	margin-left: 0.5rem;
	background-color: white;
	border-radius: 50%;
`
const StyledInput = styled(Input)`
	display: inline-flex;
	border: none;
	outline: none;
	cursor: text;
`
const StyledAlertText = styled(AlertText)`
	margin-top: 0.3rem;
	font-size: 1.5rem;
	text-align: end;
`
const S = {
	InputField,
	TagBox,
	TagItem,
	DelButton,
	StyledInput,
	StyledAlertText,
}
