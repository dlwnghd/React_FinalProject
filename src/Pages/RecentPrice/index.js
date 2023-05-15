import { useState } from 'react'
import styled from 'styled-components'
import { WidthAutoCSS } from '../../Styles/common'
import recentPriceMock from '../../__mock__/Data/Product/recentPrice.data'
import Graph from './Components/Graph'
import RecentSearch from './Components/Search'

function RecentPrice() {
	const [dummyData, setDummyData] = useState(recentPriceMock)
	const [search, setSearch] = useState('')
	const [searchPrd, setSearchPrd] = useState([])
	const [avgPrice, setAvgPrice] = useState(0)

	const onSearchPrd = search => {
		const searchList = dummyData.data.filter(item => item.name === search)

		setSearchPrd(searchList)
		setSearch(search)
		setAvgPrice(dummyData.avgPrice[search])
	}

	return (
		<S.RecentPriceWrapper>
			<RecentSearch onSearchPrd={onSearchPrd} />
			{searchPrd && (
				<Graph dummyData={searchPrd} avgPrice={avgPrice} search={search} />
			)}
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
