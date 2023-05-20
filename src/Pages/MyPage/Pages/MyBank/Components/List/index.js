import styled from 'styled-components'
import TypeSelectBox from './Components/Select/Type'
import Calendar from './Components/Select/Calendar'
import { FlexBetweenCSS } from '../../../../../../Styles/common'
import Button from '../../../../../../Components/Button/Button'

function ListSection({ filter, setFilter }) {
	return (
		<S.Wrapper>
			<S.FilterSection>
				<TypeSelectBox filter={filter} setFilter={setFilter} />
				<Calendar type={'start'} filter={filter} setFilter={setFilter} />
				<span>~</span>
				<Calendar type={'end'} filter={filter} setFilter={setFilter} />
				<S.StyledButton shape={'soft'}>조회</S.StyledButton>
			</S.FilterSection>
		</S.Wrapper>
	)
}
export default ListSection

const Wrapper = styled.div`
	margin-top: 5rem;
`

const FilterSection = styled.section`
	width: 68rem;
	${FlexBetweenCSS}

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

const S = { Wrapper, FilterSection, StyledButton }
