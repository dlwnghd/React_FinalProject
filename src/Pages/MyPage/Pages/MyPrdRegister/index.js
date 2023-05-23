import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import MyPrdItemBox from './Components/MyPrdItemBox'
// import MypageApi from '../../../../Apis/mypageApi'
import { useState } from 'react'
import TypeSelectBox from './Components/TypeSelectBox'
// import MyPageApi from '../../../../Apis/mypageApi'
// import { useQuery } from '@tanstack/react-query'
// import QUERY_KEY from '../../../../Consts/query.key'
import Pagination from '../../../../Components/Pagination/Pagination'
import useGetMyPagePrdRegisterData from '../../../../Hooks/Queries/get-myPagePrdRegister'

function MyPrdRegister() {
	const [registerData, setRegisterData] = useState()

	const [category, setCategory] = useState(0)

	const { data, isLoading, error } = useGetMyPagePrdRegisterData(category)

	console.log(category, '무료면 1임')
	return (
		<>
			{isLoading ? (
				<h1>'Loding...'</h1>
			) : (
				<>
					<S.Wrapper>
						<S.TotalNumAndFilter>
							<div>전체 {data.products.length}개</div>
							<TypeSelectBox setCategory={setCategory} />
						</S.TotalNumAndFilter>

						<S.PrdList>
							{data?.products.map((item, idx) => {
								return (
									<MyPrdItemBox key={idx} item={item} category={category} />
								)
							})}
						</S.PrdList>
					</S.Wrapper>
					<Pagination total={data?.count} limit={10} page={1} />
				</>
			)}
		</>
	)
}

export default MyPrdRegister

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin-bottom: 5rem;
`
const TotalNumAndFilter = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
`

const PrdList = styled.div`
	width: 100%;
	margin-top: 4rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`
const S = { Wrapper, TotalNumAndFilter, PrdList }
