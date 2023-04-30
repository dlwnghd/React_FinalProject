import styled from 'styled-components'
import Filter from '../../Components/Filter/Filter'
import { WidthAutoCSS } from '../../Styles/common'

function Search() {
	const searchFilter = ['최근 등록순', '인기순', '높은 가격순', '낮은 가격순']

	return (
		<S.Wrapper>
			<Filter filter={searchFilter} />
		</S.Wrapper>
	)
}

export default Search

const Wrapper = styled.section`
	position: relative;
	${WidthAutoCSS}
	padding:12rem 0;
`

const S = {
	Wrapper,
}
