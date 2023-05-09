import styled from 'styled-components'
import TypeSelectBox from './Components/Type'
import { FlexBetweenCSS } from '../../../../../../Styles/common'
import Calendar from './Components/Calendar'

function SelectSection({ setFilter }) {
	return (
		<S.Wrapper>
			<TypeSelectBox setFilter={setFilter} />
			<Calendar setFilter={setFilter} />
		</S.Wrapper>
	)
}
export default SelectSection

const Wrapper = styled.div`
	${FlexBetweenCSS}
	margin-top: 5rem;
`

const S = { Wrapper }
