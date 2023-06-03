import { Skeleton } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import Filter from './Components/DateFilter'
import useGetQuoteProductList from '../../Hooks/Queries/get-quoteList'
import {
	ColumnNumberCSS,
	FlexBetweenCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import Graph from './Components/Graph'
import RecentSearch from './Components/Search'
import SoldOutList from './Components/SoldOutList'
import getFormattedDate from '../../Utils/getFormattedDate'
import { useSearchParams } from 'react-router-dom'
import MainSkeleton from '../../Components/ItemBox/ItemSkeleton'


	const location = useLocation()
function RecentPrice() {
	const { state: title } = location

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
			if (date === item) {
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
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchQuote, setSearchQuote] = useState(
		searchParams.get('quote') || '',
	)

	// 1년 전 데이터 구하기 (yyyy-mm-dd)
	const getOneYearAgo = () => {
		const oneYearAgo = new Date()
		oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
		return getFormattedDate(oneYearAgo)
	}

	// use-query 시작
	// searchQuote가 바뀌면서 화면이 State의 변화를 읽고 리랜더링
	const { data, error, status, isLoading } = useGetQuoteProductList({
		keyword: searchQuote,
		start: getOneYearAgo(),
		end: getFormattedDate(new Date()),
	})

	if (error) {
		return
	}

	return (
		<S.RecentPriceWrapper>
			<S.RecentPriceContainer>
				<S.OptionContainer>
					<RecentSearch setSearchQuote={setSearchQuote} title={title} />
					<Filter
						filterArray={dateFilter}
						onFilter={onFilter}
						searchQuote={searchQuote}
					/>
				</S.OptionContainer>
				{!isLoading ? (
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
			<S.SoldOutListWrapper>
				<h3>최근 거래 종료 품목</h3>
				<S.SoldOutListContainer>
					{!isLoading ? (
						<SoldOutList soldOutList={data} />
					) : (
						Array(8)
							.fill('')
							.map((_, i) => <MainSkeleton />)
					)}
				</S.SoldOutListContainer>
			</S.SoldOutListWrapper>
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
	${FlexBetweenCSS}
	align-items: flex-end;
	padding-bottom: 1.5rem;
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

const SoldOutListWrapper = styled.div``

const SoldOutListContainer = styled.div`
	width: 100%;
	margin-top: 4rem;
	margin-bottom: 8rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const S = {
	RecentPriceWrapper,
	RecentPriceContainer,
	OptionContainer,
	SkeletonBox,
	SoldOutListWrapper,
	SoldOutListContainer,
}
