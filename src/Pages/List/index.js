import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Filter from '../../Components/Filter/Filter'
import useGetProductList from '../../Hooks/Queries/get-productlist'
import { FlexBetweenCSS, WidthAutoCSS } from '../../Styles/common'
import ProductList from './Components/ProductList'

function List() {
	// 현재 URL 기억 State (0: 무료, 1: 중고)
	const currentURL = useLocation().pathname.includes('freeMarket') ? 1 : 0
	// use-query 시작
	const { data, isSuccess, hasNextPage, fetchNextPage, isFetching } =
		useGetProductList({
			category: currentURL,
		})

	const listFilter = [
		'최근 등록순',
		'인기 높은순',
		'높은 가격순',
		'낮은 가격순',
	]

	// Filter 선택관리 State
	const [filterOption, setFilterOption] = useState(listFilter[0])

	// Filter선택 실행 코드
	const onFilter = e => {
		switch (e.target.innerText) {
			case listFilter[0]:
				setFilterOption(listFilter[0])
				break
			case listFilter[1]:
				setFilterOption(listFilter[1])
				break
			case listFilter[2]:
				setFilterOption(listFilter[2])
				break
			case listFilter[3]:
				setFilterOption(listFilter[3])
				break
			default:
				break
		}
	}

	return (
		<S.ListWrapper>
			<S.ListContainer>
				<S.MainContent>
					<S.SearchContent>
						<h3>{isSuccess ? data.pages[0].pagination.count : 0}개의 상품</h3>
						<Filter
							filterArray={!currentURL ? listFilter : listFilter.slice(0, 2)}
							onClick={onFilter}
						/>
					</S.SearchContent>
					<ProductList
						data={data}
						isSuccess={isSuccess}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
						isFetching={isFetching}
					/>
				</S.MainContent>
			</S.ListContainer>
		</S.ListWrapper>
	)
}

export default List

const ListWrapper = styled.section`
	position: relative;
	${WidthAutoCSS}
`

const ListContainer = styled.div`
	margin: 12rem 0;
	margin-bottom: 12rem;
	${FlexBetweenCSS}
`

const MainContent = styled.div`
	width: 100%;
`

const SearchContent = styled.div`
	position: relative;
	${FlexBetweenCSS};
	margin-bottom: 2rem;
`

const S = {
	ListWrapper,
	ListContainer,
	MainContent,
	SearchContent,
}
