import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import MyPrdItemBox from './Components/MyPrdItemBox'
// import MypageApi from '../../../../Apis/mypageApi'
import { useState } from 'react'
import TypeSelectBox from './Components/TypeSelectBox'
import MyPageApi from '../../../../Apis/mypageApi'
import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../../../Consts/query.key'
import Pagination from '../../../../Components/Pagination/Pagination'

function MyPrdRegister() {
	const [registerData, setRegisterData] = useState()

	const [category, setCategory] = useState(0)

	const getMyPagePrdRegisterData = async () => {
		const res = await MyPageApi.productList({ page: 1, category })
		console.log(res.data)
		return res.data
	}

	const useGetMyPagePrdRegisterData = () => {
		const { data, error, status, isLoading, isError } = useQuery(
			[QUERY_KEY.GET_MYPAGE_REGISTER_DATA, category],
			() => getMyPagePrdRegisterData(),
			// { staleTime: 1000 * 60 * 5 },
		)
		return { data, error, status, isLoading, isError }
	}

	const { data, isLoading, error } = useGetMyPagePrdRegisterData()

	return (
		<>
			<S.Wrapper>
				<S.TotalNumAndFilter>
					<div>전체 {registerData ? registerData.length : 0}개</div>
					<TypeSelectBox setCategory={setCategory} />
				</S.TotalNumAndFilter>

				<S.PrdList>
					{data?.products.map((item, idx) => {
						return <MyPrdItemBox key={idx} item={item} />
					})}
				</S.PrdList>
			</S.Wrapper>
			<Pagination total={data?.count} limit={10} page={1} />
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
