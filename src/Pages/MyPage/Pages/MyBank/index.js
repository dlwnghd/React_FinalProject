import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import AmountSection from './Components/Amount'
import SelectSection from './Components/Select'
import { useState } from 'react'
import getFormattedDate from '../../../../Utils/getFormattedDate'

function MyBank() {
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
			<AmountSection />
			<SelectSection setFilter={setFilter} />
		</S.Wrapper>
	)
}

export default MyBank

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin-bottom: 10rem;
`

const S = { Wrapper }
