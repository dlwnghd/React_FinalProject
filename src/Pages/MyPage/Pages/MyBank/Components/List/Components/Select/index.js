import styled from 'styled-components'
import TypeSelectBox from './Type'
import Calendar from './Calendar'
import { FlexBetweenCSS } from '../../../../../../../../Styles/common'
import Button from '../../../../../../../../Components/Button/Button'

function FilterSection({ filter, setFilter, payList }) {
	return (
		<S.Wrapper>
			<TypeSelectBox filter={filter} setFilter={setFilter} />
			<Calendar type={'start'} filter={filter} setFilter={setFilter} />
			<span>~</span>
			<Calendar type={'end'} filter={filter} setFilter={setFilter} />
			<S.StyledButton shape={'soft'}>조회</S.StyledButton>
		</S.Wrapper>
	)
}
export default FilterSection

const Wrapper = styled.div`
	${FlexBetweenCSS}
	width: 68rem;
	margin-top: 5rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 47rem;
	}
`
const StyledButton = styled(Button)`
	width: 13rem;
	height: 3.5rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 8rem;
	}
`

const S = { Wrapper, StyledButton }
