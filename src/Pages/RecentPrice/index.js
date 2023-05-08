import { useState } from 'react'
import styled from 'styled-components'
import { WidthAutoCSS } from '../../Styles/common'
import recentPriceMock from '../../__mock__/Data/Product/recentPrice.data'

import Graph from './Components/Graph/Graph'
import RecentSearch from './Components/Search/Search'

function RecentPrice() {
	const [dummyData, setDummyData] = useState(recentPriceMock)

	return (
		<S.RecentPriceWrapper>
			<RecentSearch />
			<Graph dummyData={dummyData} />
		</S.RecentPriceWrapper>
	)
}

export default RecentPrice

const RecentPriceWrapper = styled.section`
	${WidthAutoCSS};
`

const S = {
	RecentPriceWrapper,
}
