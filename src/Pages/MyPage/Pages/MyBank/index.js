import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useGetMyPageBankList from '../../../../Hooks/Queries/get-myPageBank'

import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
// import AmountSection from './Components/Amount'

// import { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'

import getFormattedDate from '../../../../Utils/getFormattedDate'
import FilterSection from './Components/List/Components/Select'
import PayList from './Components/List/Components/List/PayList'
import Pagination from '../../../../Components/Pagination/Pagination'
import StackedBar from './Components/List/Components/StackedBar/StackedBar'

function MyBank() {
	const navigate = useNavigate()
	const location = useLocation()

	const [searchParams, setSearchParams] = useSearchParams()
	const params = {
		page: searchParams.get('page'),
		category: searchParams.get('category'),
		start: searchParams.get('start'),
		end: searchParams.get('end'),
	}

	const today = new Date() // 처음 세팅은 오늘 날짜를 기준으로 해당 연도와 달, 1일 ~ 해당 연도와 달, 오늘날짜로 설정합니다.
	const [filter, setFilter] = useState({
		page: params.page || 1,
		category: params.category || 'seller',
		start: params.start || getFormattedDate(today, { day: 1 }),
		end: params.end || getFormattedDate(today, { day: true }),
	})

	const { data, status, refetch } = useGetMyPageBankList(filter)

	const setPage = page => {
		setFilter(prev => ({ ...prev, page }))
	}

	const getNewBankList = () => {
		navigate(
			`${location.pathname}?page=${filter.page}&category=${filter.category}&start=${filter.start}&end=${filter.end}`,
		)
		refetch()
	}

	// Mock----------------------------------------------------
	// const [data, setData] = useState({})

	// const getData = useCallback(async () => {
	// 	try {
	// 		const { data } = await axios.get('/api/user/my-page/account-book', {
	// 			params: filter,
	// 		})
	// 		console.log(data)
	// 		setData(data)
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }, [filter])

	// useEffect(() => {
	// 	getData()
	// }, [])

	// const setPage = page => {
	// 	setFilter(prev => ({ ...prev, page }))
	// }

	// const getNewBankList = () => {
	// 	navigate(
	// 		`${location.pathname}?page=${filter.page}&category=${filter.category}&start=${filter.start}&end=${filter.end}`,
	// 	)
	// 	getData()
	// }

	// ----------------------------------------------------------------

	return (
		<S.Wrapper>
			{/* <AmountSection
				status={status}
				amount={
					data?.amount ?? {
						totalSaleAmount: 0,
						totalPurchaseAmount: 0,
						thisMonthSaleAmount: 0,
						thisMonthPurchaseAmount: 0,
					}
				}
			/> */}
			<StackedBar
				status={status}
				sale={data?.amount.thisMonthSaleAmount || 0}
				purchase={data?.amount.thisMonthPurchaseAmount || 0}
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

			{status === 'success' && data?.payList.length !== 0 && (
				<Pagination
					totalPage={data?.pagination.totalPage}
					setPage={setPage}
					limit={10}
					scroll={765}
				/>
			)}
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
