import { useState } from 'react'
import Filter from '../../Components/Filter/Filter'

import Graph from './Components/Graph/Graph'
import RecentSearch from './Components/Search/Search'

function RecentPrice() {
	const dateFilter = ['3개월', '6개월', '1년']
	const [filterOption, setFilterOption] = useState(dateFilter[0])
	const onFilter = e => {
		switch (e.target.innerText) {
			case dateFilter[0]:
				setFilterOption(dateFilter[0])
				break
			case dateFilter[1]:
				setFilterOption(dateFilter[1])
				break
			case dateFilter[2]:
				setFilterOption(dateFilter[2])
				break
			default:
				break
		}
	}
	return (
		<>
			<RecentSearch />
			<Filter filterArray={dateFilter} onClick={onFilter} />
			<Graph filterOption={filterOption} />
		</>
	)
}

export default RecentPrice
