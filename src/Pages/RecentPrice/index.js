import { useState } from 'react'
import Filter from '../../Components/Filter/Filter'
import recentPriceMock from '../../__mock__/Data/Product/recentPrice.data'

import Graph from './Components/Graph/Graph'
import RecentSearch from './Components/Search/Search'

function RecentPrice() {
	const dateFilter = ['3개월', '6개월', '1년']
	const [filterOption, setFilterOption] = useState(dateFilter[0])
	
	const [dummyTotalData, setDummyTotalData] = useState(recentPriceMock)
	const [dummyData, setDummyData] = useState(dummyTotalData)

	const onFilter = e => {
		switch (e.target.innerText) {
			case dateFilter[0]:
				setFilterOption(dateFilter[0])
				setDummyData(dummyTotalData.slice(0, 90)) // 3개월 (90일)
				break
			case dateFilter[1]:
				setFilterOption(dateFilter[1])
				setDummyData(dummyTotalData.slice(0, 180)) // 6개월 (180일)
				break
			case dateFilter[2]:
				setFilterOption(dateFilter[2])
				setDummyData(dummyTotalData.slice(0, 365)) // 1년 (365일)
				break
			default:
				break
		}
	}

	return (
		<>
			<RecentSearch />
			<Filter filterArray={dateFilter} onClick={onFilter} />
			<Graph filterOption={filterOption} dummyData={dummyData} />
		</>
	)
}


export default RecentPrice
