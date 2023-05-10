import { useState } from 'react'
import styled from 'styled-components'
import TypeSelectBox from './Components/Select/Type'
import Calendar from './Components/Select/Calendar'
import getFormattedDate from '../../../../../../Utils/getFormattedDate'

function ListSection() {
	const today = new Date()
	const formattedThisMonth = getFormattedDate(today, { day: 1 })
	const formattedToday = getFormattedDate(today, { day: today.getDate() })

	const [filter, setFilter] = useState({
		page: 1,
		category: 'seller',
		start: formattedThisMonth,
		end: formattedToday,
	})

	return (
		<S.Wrapper>
			<S.FilterSection>
				<TypeSelectBox setFilter={setFilter} />
				<Calendar setFilter={setFilter} />
			</S.FilterSection>
		</S.Wrapper>
	)
}
export default ListSection

const Wrapper = styled.div`
	margin-top: 5rem;
`

const FilterSection = styled.section``

const S = { Wrapper, FilterSection }
