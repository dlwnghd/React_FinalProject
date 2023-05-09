import styled from 'styled-components'
import TypeSelectBox from './Components/Type'
import { FlexBetweenCSS } from '../../../../../../Styles/common'

function SelectSection() {
	return (
		<S.Wrapper>
			<TypeSelectBox />
		</S.Wrapper>
	)
}
export default SelectSection

const Wrapper = styled.div`
	${FlexBetweenCSS}
	margin-top: 5rem;
`

const S = { Wrapper }
