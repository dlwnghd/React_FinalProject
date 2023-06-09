import styled from 'styled-components'
import { FlexBetweenCSS, WidthAutoCSS } from '../../Styles/common'
import { useParams } from 'react-router-dom'
import Filter from '../../Components/Filter/Filter'
import { useState, useEffect } from 'react'
import SearchResult from './Components/SearchList'
import useGetSearchResultData from '../../Hooks/Queries/get-searchResult'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../Atoms/modal.atom'
import EmptyList from '../../Components/EmptyList/EmptyList'

const skeletonUI = new Array(8).fill(0)

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

	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

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

	const totalCount = data?.pages[0].pagination.count

	useEffect(() => {
		if (totalCount === 0) setIsOpenModal(true)
	}, [word, totalCount])

	return (
		<S.Wrapper>
			<S.SearchContainer totalCount={totalCount}>
				{totalCount !== 0 ? (
					<>
						<S.SearchTitle>
							<h3>{isSuccess && totalCount}개를 찾았습니다.</h3>
							<Filter filterArray={listFilter} onClick={onFilter} />
						</S.SearchTitle>
						<SearchResult
							searchResult={data}
							skeletonUI={skeletonUI}
							isSuccess={isSuccess}
							fetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
							isFetching={isFetching}
						/>
					</>
				) : (
					<EmptyList />
				)}
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
