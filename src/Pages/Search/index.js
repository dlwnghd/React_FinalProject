import styled from 'styled-components'
import Filter from '../../Components/Filter/Filter'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import { useNavigate, useParams } from 'react-router-dom'
import productsMock from '../../__mock__/Data/Product/product.data'
import ItemBox from '../../Components/ItemBox/ItemBox'
import { useState } from 'react'

function Search() {
	const searchFilter = ['최근 등록순', '인기순', '높은 가격순', '낮은 가격순']
	const { word } = useParams()

	// Api를 통해 들고오는... 검색한 쿼리스트링에 맞는 데이터만 호출하여 map...
	// const { data, status, isLoading } = useSearchQuery({ word })

	// searchFilter에서 사용되는 필터에 맞게 map을 통해 나오는 결과값이 달라지게 구조를 설정해야함
	// 이 문자열이 오는 경우, 이 비즈니스 로직이 발생되게...
	const searchResult = productsMock.filter(item => item.title.includes(word))
	const [isChangeResult, setIsChangeResult] = useState(searchResult)
	const navigate = useNavigate()
	console.log(productsMock)

	const onSearchClick = e => {
		if (e.target.innerText === searchFilter[0]) {
		}
	}

	return (
		<S.Wrapper>
			<S.SearchContainer>
				<S.SearchTopper>
					<h3>
						{searchResult.length}개의 {word}를 찾았습니다.
					</h3>
					<Filter filterArray={searchFilter} onClick={onSearchClick} />
				</S.SearchTopper>
				<S.ResultList>
					{isChangeResult.map((item, idx) => {
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
	margin-bottom: 4rem;
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
