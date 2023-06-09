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
import EmptyList from '../../../../Components/EmptyList/EmptyList'
import ErrorFallback from '../../../../Components/Error/ErrorFallback'

function MyInterest() {
	const arr = Array(10).fill(0)
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState(searchParams.get('page'))
	const { data, error, status, refetch, fetchStatus } = useGetMyInterest({
		page,
	})

	useEffect(() => {
		refetch()
	}, [page])

	if (status === 'error') {
		return <ErrorFallback error={error} />
	}

	return (
		<S.Wrapper>
			<S.Text>전체 {data?.pagination.count}개</S.Text>
			{data?.LikeList.length === 0 && <EmptyList />}
			<S.Container>
				{arr.map(_ => {
					return (
						<>
							{fetchStatus === 'fetching' && <MainSkeleton />}
							{status === 'loading' && <MainSkeleton />}
						</>
					)
				})}

				{data?.LikeList?.map(item => {
					return (
						<>
							{!(fetchStatus === 'fetching') && !(status === 'loading') && (
								<ItemBox
									title={item.Product.title}
									price={item.Product.price}
									posterPath={item.Product.img_url}
									isLiked={item.Product.liked}
									key={item.Product.idx}
									createdAt={item.Product.createdAt}
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
const Text = styled.div`
	margin-top: 2rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
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
	Text,
	Container,
}
