import styled from 'styled-components'
import Filter from '../../Components/Filter/Filter'
import { FlexBetweenCSS, WidthAutoCSS } from '../../Styles/common'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { isProductPageAtom } from '../../Atoms/productPage.atom'
import SearchList from './Components/SearchList'
import productsMock from '../../__mock__/Data/Product/product.data'

function Search() {
	const searchFilter = [
		'최근 등록순',
		'인기 높은순',
		'높은 가격순',
		'낮은 가격순',
	]
	const { word } = useParams()

	// Api를 통해 들고오는... 검색한 쿼리스트링에 맞는 데이터만 호출하여 map...
	// const { data, status, isLoading } = useSearchQuery({ word })
	// word를 통해 호출된 data 중 status가 "판매중"인 것들만 배열에 담기

	const [changeResult, setChangeResult] = useState([]) // 변경될 데이터
	const [totalList, setTotalList] = useState([])

	const [filterOption, setFilterOption] = useState(searchFilter[0])
	const [page, setPage] = useRecoilState(isProductPageAtom)

	useEffect(() => {
		setPage(1)
		setTotalList(productsMock.filter(item => item.title.includes(word)))
		setChangeResult([])
	}, [word, filterOption])

	const onFilter = e => {
		switch (e.target.innerText) {
			case searchFilter[0]:
				setFilterOption(searchFilter[0])
				break
			case searchFilter[1]:
				setFilterOption(searchFilter[1])
				break
			case searchFilter[2]:
				setFilterOption(searchFilter[2])
				break
			case searchFilter[3]:
				setFilterOption(searchFilter[3])
				break
			default:
				break
		}
	}

	return (
		<S.Wrapper>
			<S.SearchContainer>
				<S.SearchTopper>
					<h3>
						{totalList.length}개의 {word}를 찾았습니다.
					</h3>
					<Filter filterArray={searchFilter} onClick={onFilter} />
				</S.SearchTopper>
				<SearchList
					changeResult={changeResult}
					setChangeResult={setChangeResult}
					word={word}
					page={page}
					setPage={setPage}
					filterOption={filterOption}
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

const SearchTopper = styled.div`
	position: relative;
	${FlexBetweenCSS};
	margin-bottom: 2rem;
`

const S = {
	Wrapper,
	SearchContainer,
	SearchTopper,
}
