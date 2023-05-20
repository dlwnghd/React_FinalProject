import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import AmountSection from './Components/Amount'

import ListSection from './Components/List'
import { useState } from 'react'
import getFormattedDate from '../../../../Utils/getFormattedDate'

function MyBank() {
	const today = new Date()

	// 처음 세팅은 오늘 날짜를 기준으로
	// 해당 연도와 달, 1일 ~ 해당 연도와 달, 오늘날짜로 설정합니다.
	const [filter, setFilter] = useState({
		page: 1,
		category: 'seller',
		start: getFormattedDate(today, { day: 1 }),
		end: getFormattedDate(today, { day: true }),
	})

	return (
		<S.Wrapper>
			<AmountSection />
			<ListSection filter={filter} setFilter={setFilter} />
		</S.Wrapper>
	)
}

export default MyBank

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin-bottom: 10rem;
	min-height: 50rem;
`

const S = { Wrapper }
