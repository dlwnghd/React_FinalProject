import styled from 'styled-components'
import Filter from '../../Components/Filter/Filter'
import {
	ColumnNumberCSS,
	FlexBetweenCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import { useNavigate, useParams } from 'react-router-dom'
import productsMock from '../../__mock__/Data/Product/product.data'
import ItemBox from '../../Components/ItemBox/ItemBox'
import { useState } from 'react'
import { useEffect } from 'react'

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

	const searchResult = productsMock
		.slice(0, 20)
		.filter(item => item.title.includes(word)) // 호출된 데이터
	const [changeResult, setChangeResult] = useState(searchResult) // 스테이트 관리

	useEffect(() => {
		setChangeResult(searchResult)
	}, [word])

	const onFilter = e => {
		if (e.target.innerText === searchFilter[0]) {
			setChangeResult([
				...changeResult.sort(
					(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
				),
			])
		}

		if (e.target.innerText === searchFilter[1]) {
			setChangeResult([...changeResult.sort((a, b) => b.idx - a.idx)])
		}

		if (e.target.innerText === searchFilter[2]) {
			setChangeResult([...changeResult.sort((a, b) => b.price - a.price)])
		}

		if (e.target.innerText === searchFilter[3]) {
			setChangeResult([...changeResult.sort((a, b) => a.price - b.price)])
		}
		console.log(changeResult)
	}

	const navigate = useNavigate()
	return (
		<S.Wrapper>
			<S.SearchContainer>
				<S.SearchTopper>
					<h3>
						{changeResult.length}개의 {word}를 찾았습니다.
					</h3>
					<Filter filterArray={searchFilter} onClick={onFilter} />
				</S.SearchTopper>
				<S.ResultList>
					{changeResult.map((item, idx) => {
						return (
							<ItemBox
								title={item.title}
								price={item.price}
								posterPath={item.image_url}
								context={item.script}
								isLiked={item.liked}
								key={idx}
								onClick={() => navigate(`/detail/${item.idx}`)}
							/>
						)
					})}
				</S.ResultList>
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

const ResultList = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(4)}

	@media screen and (max-width:${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const S = {
	Wrapper,
	SearchContainer,
	SearchTopper,
	ResultList,
}
