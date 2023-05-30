import styled from 'styled-components'
import { FlexBetweenCSS, WidthAutoCSS } from '../../Styles/common'
import { useParams } from 'react-router-dom'
import Filter from '../../Components/Filter/Filter'
import { useState, useEffect } from 'react'
import SearchResult from './Components/SearchList'
import useGetSearchResultData from '../../Hooks/Queries/get-searchResult'

function Search() {
	const listFilter = [
		'최근 등록순',
		'인기 높은순',
		'높은 가격순',
		'낮은 가격순',
	]

	const { word } = useParams()
	const [filterOption, setFilterOption] = useState(listFilter[0])
	const [searchFilter, setSearchFilter] = useState({
		order: 'createdAt',
		sort: 'desc',
	})

	const onFilter = e => {
		switch (e.target.innerText) {
			case listFilter[0]:
				setFilterOption(listFilter[0])
				setSearchFilter({
					order: 'createdAt',
					sort: 'desc',
				})
				break
			case listFilter[1]:
				setFilterOption(listFilter[1])
				setSearchFilter({
					order: 'popular',
					sort: 'asc',
				})
				break
			case listFilter[2]:
				setFilterOption(listFilter[2])
				setSearchFilter({
					order: 'price',
					sort: 'desc',
				})
				break
			case listFilter[3]:
				setFilterOption(listFilter[3])
				setSearchFilter({
					order: 'price',
					sort: 'asc',
				})
				break
			default:
				break
		}
	}

	const { data, isSuccess, refetch, fetchNextPage, isFetching, hasNextPage } =
		useGetSearchResultData(word, searchFilter)

	useEffect(() => {
		fetchNextPage(0)
		refetch()
	}, [word, searchFilter])

	return isSuccess && data.pages[0].pagination.count !== 0 ? (
		<S.Wrapper>
			<S.SearchContainer>
				<S.SearchTitle>
					<h3>{isSuccess && data.pages[0].pagination.count}개를 찾았습니다.</h3>
					<Filter filterArray={listFilter} onClick={onFilter} />
				</S.SearchTitle>
				<SearchResult
					searchResult={data}
					isSuccess={isSuccess}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetching={isFetching}
				/>
			</S.SearchContainer>
		</S.Wrapper>
	) : (
		<>
			<div>fff</div>
		</>
	)
}

export default Search

const Wrapper = styled.section`
	position: relative;
	${WidthAutoCSS}
`

const SearchContainer = styled.div`
	margin: 12rem 0;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		margin: 6rem 0;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin: 3rem 0;
	}
`

const SearchTitle = styled.div`
	position: relative;
	${FlexBetweenCSS};
	margin-bottom: 2rem;
`

const S = {
	Wrapper,
	SearchContainer,
	SearchTitle,
}
