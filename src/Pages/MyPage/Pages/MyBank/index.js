import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import AmountSection from './Components/Amount'

import ListSection from './Components/List'

function MyBank() {
	return (
		<S.Wrapper>
			<AmountSection />
			<ListSection />
		</S.Wrapper>
	)
}

export default MyBank

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin-bottom: 10rem;
`

const S = { Wrapper }
