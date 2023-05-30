import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../../../Styles/common'
import ItemBox from '../../../../Components/ItemBox/ItemBox'
// import { useEffect } from 'react'
import MainSkeleton from '../../../../Components/ItemBox/ItemSkeleton'
import useGetMyInterest from '../../../../Hooks/Queries/get-myInterest'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from '../../../../Components/Pagination/Pagination'
import { useState } from 'react'
import { useEffect } from 'react'

function MyInterest() {
	const arr = Array(10).fill(0)
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState(searchParams.get('page'))
	const { data, error, status, isLoading, isError, isRefetching, refetch } =
		useGetMyInterest({ page })

	useEffect(() => {
		refetch()
	}, [page])

	return (
		<S.Wrapper>
			<S.Container>
				{arr.map(_ => {
					return (
						<>
							{isRefetching && <MainSkeleton />}
							{isLoading && <MainSkeleton />}
						</>
					)
				})}

				{data?.LikeList?.map(item => {
					return (
						<>
							{!isRefetching && !isLoading && (
								<ItemBox
									title={item.Product.title}
									price={item.Product.price}
									posterPath={item.Product.img_url}
									// context={item.description}
									isLiked={item.Product.liked}
									key={item.Product.idx}
									onClick={() => navigate(`/detail/${item.Product.idx}`)}
									prod_idx={item.Product.idx}
								/>
							)}
						</>
					)
				})}
			</S.Container>
			<Pagination
				totalPage={data?.pagination.totalPage}
				setPage={setPage}
				limit={10}
				scroll={300}
			/>
		</S.Wrapper>
	)
}

export default MyInterest

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const Container = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(5)};
	margin: 4rem auto;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		gap: 3rem 1rem;
	}
`

const S = {
	Wrapper,
	Container,
}
