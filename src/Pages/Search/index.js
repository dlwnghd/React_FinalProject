import styled from 'styled-components'
import { FlexBetweenCSS, WidthAutoCSS } from '../../Styles/common'
import { useParams } from 'react-router-dom'
import Filter from '../../Components/Filter/Filter'
import { useState, useEffect } from 'react'
import SearchResult from './Components/SearchList'
import useGetSearchResultData from '../../Hooks/Queries/get-searchResult'

function Search() {
	const searchFilter = [
		'최근 등록순',
		'인기 높은순',
		'높은 가격순',
		'낮은 가격순',
	]

	const { word } = useParams()
	const [filterOption, setFilterOption] = useState(searchFilter[0])

	const {
		data: searchData,
		status,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useGetSearchResultData(word)

	useEffect(() => {
		fetchNextPage(0)
	}, [word, filterOption])

	if (isLoading && status === 'loading') return

	const searchResultLength = searchData.pages.map(page => {
		return page.product.length
	})
	const searchResultNumber = searchResultLength.reduce((a, b) => a + b)

	return (
		<S.Wrapper>
			<S.SearchContainer>
				<S.SearchTitle>
					<h3>{searchResultNumber}개의 를 찾았습니다.</h3>
					<Filter filterArray={searchFilter} />
				</S.SearchTitle>
				<SearchResult
					searchData={searchData}
					status={status}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
			</S.SearchContainer>
		</S.Wrapper>
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
