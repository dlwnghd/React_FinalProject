import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import AmountSection from './Components/Amount'

import { useState } from 'react'
import getFormattedDate from '../../../../Utils/getFormattedDate'
import useGetMyPageBankList from '../../../../Hooks/Queries/get-myPageBank'
import FilterSection from './Components/List/Components/Select'
import PayList from './Components/List/Components/List/PayList'

function MyBank() {
	// 처음 세팅은 오늘 날짜를 기준으로
	// 해당 연도와 달, 1일 ~ 해당 연도와 달, 오늘날짜로 설정합니다.
	const today = new Date()
	const [filter, setFilter] = useState({
		page: 1,
		category: 'seller',
		start: getFormattedDate(today, { day: 1 }),
		end: getFormattedDate(today, { day: true }),
	})

	const { data, status, refetch } = useGetMyPageBankList(filter)

	const getNewBankList = () => {
		refetch()
	}

	return (
		<S.Wrapper>
			<AmountSection
				status={status}
				amount={
					data?.amount ?? {
						totalSaleAmount: 0,
						totalPurchaseAmount: 0,
						thisMonthSaleAmount: 0,
						thisMonthPurchaseAmount: 0,
					}
				}
			/>
			<FilterSection
				filter={filter}
				setFilter={setFilter}
				onSearch={getNewBankList}
			/>
			<PayList
				status={status}
				category={filter.category}
				payList={data?.payList ?? []}
			/>
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
