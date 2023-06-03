import { Skeleton } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import Filter from './Components/DateFilter'
import useGetQuoteProductList from '../../Hooks/Queries/get-quoteList'
import { FlexAlignCSS, WidthAutoCSS } from '../../Styles/common'
import Graph from './Components/Graph'
import RecentSearch from './Components/Search'
import SoldOutList from './Components/SoldOutList'

function RecentPrice() {
	// Filter 종류
	const dateFilter = [
		'최근 일주일',
		'최근 1개월',
		'최근 3개월',
		'최근 6개월',
		'최근 1년',
	]

	// 필터버튼 클릭시
	const onFilter = date => {
		dateFilter.some(item => {
			if (date == item) {
				updateData(item)
				return true
			}
			return false
		})
	}

	// ApexFilter zoom-in, zoom-out 적용
	function updateData(timeline) {
		const dateFilter = {
			'최근 일주일': 7,
			'최근 1개월': 30,
			'최근 3개월': 90,
			'최근 6개월': 270,
			'최근 1년': 365,
		}

		// Zoom 조절
		return ApexCharts.exec('quoteGraph', 'updateOptions', {
			xaxis: {
				range: dateFilter[timeline] * 24 * 60 * 60 * 1000,
			},
		})
	}

	// 시세 상품 검색어
	const [searchQuote, setSearchQuote] = useState('')

	// 날짜 형태 (yyy-mm-dd)로 변경
	const formatDate = date => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	// 1년 전 데이터 구하기 (yyyy-mm-dd)
	const getOneYearAgo = () => {
		const oneYearAgo = new Date()
		oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
		return formatDate(oneYearAgo)
	}

	// use-query 시작
	// searchQuote가 바뀌면서 화면이 State의 변화를 읽고 리랜더링
	const { data, error, status, isLoading } = useGetQuoteProductList({
		keyword: searchQuote,
		start: getOneYearAgo(),
		end: formatDate(new Date()),
	})

	if (isLoading) return

	if (error) {
		return
	}

	return (
		<S.RecentPriceWrapper>
			<S.RecentPriceContainer>
				<S.OptionContainer>
					<RecentSearch setSearchQuote={setSearchQuote} />
					<Filter
						filterArray={dateFilter}
						onFilter={onFilter}
						searchQuote={searchQuote}
					/>
				</S.OptionContainer>
				{data ? (
					<Graph quoteList={data} searchQuote={searchQuote} />
				) : (
					<S.SkeletonBox>
						<Skeleton
							sx={{ bgcolor: 'grey.400' }}
							animation="wave"
							variant="rounded"
							width={'100%'}
							height={'100%'}
						/>
					</S.SkeletonBox>
				)}
			</S.RecentPriceContainer>
			<SoldOutList soldOutList={data} />
		</S.RecentPriceWrapper>
	)
}

export default RecentPrice

const RecentPriceWrapper = styled.section`
	${WidthAutoCSS};
`

const RecentPriceContainer = styled.div`
	margin-top: 5.5rem;
	margin-bottom: 12.5rem;
`

const OptionContainer = styled.div`
	${FlexAlignCSS}
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
`

const SkeletonBox = styled.div`
	height: 515px;
	width: 900px;
	margin: auto;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		height: 415px;
		width: 660px;
	}
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		height: 215px;
		width: 330px;
	}
`

const S = {
	RecentPriceWrapper,
	RecentPriceContainer,
	OptionContainer,
	SkeletonBox,
}
