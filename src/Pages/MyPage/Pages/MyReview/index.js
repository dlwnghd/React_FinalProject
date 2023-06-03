import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../../../Styles/common'
import useGetReviewList from '../../../../Hooks/Queries/get-reviewList'
import { useState } from 'react'
import ReviewCard from './Components/Card'
import Pagination from '../../../../Components/Pagination/Pagination'
import ReviewCardLoading from './Components/Card/Components/Loading/Loading'
import ErrorFallback from '../../../../Components/Error/ErrorFallback'

function MyReview() {
	const [page, setPage] = useState(1)

	const { data, error, status, refetch } = useGetReviewList({ page })

	if (status === 'loading') {
		return (
			<S.Wrapper>
				<S.Container>
					{Array(2)
						.fill()
						.map((_, i) => (
							<ReviewCardLoading />
						))}
				</S.Container>
			</S.Wrapper>
		)
	}
	if (status === 'error') {
		return <ErrorFallback error={error} refetch={refetch} />
	}

	const { pagination, reviewList } = data

	return (
		<S.Wrapper>
			<S.Container>
				{reviewList.map(review => (
					<ReviewCard key={review.idx} review={review} />
				))}
			</S.Container>
			<Pagination
				limit={10}
				totalPage={pagination.totalPage}
				setPage={setPage}
				scroll={400}
			/>
		</S.Wrapper>
	)
}
export default MyReview

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const Container = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(1)}
	}
`

const S = { Wrapper, Container }
