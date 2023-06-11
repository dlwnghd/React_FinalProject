import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import { useParams } from 'react-router-dom'
import useGetDetailData from '../../Hooks/Queries/get-detailPage'
import Thumbnail from './Components/Thumbnail/Thumbnail'
import Description from './Components/Description/Description'
import Contents from './Components/Contents/Contents'
import ThumbnailSkeleton from './Components/Skeleton/ThumbnailSkeleton'
import DescSkeleton from './Components/Skeleton/DescSkeleton'
import ErrorFallback from '../../Components/Error/ErrorFallback'

function Detail() {
	const { idx } = useParams()

	const {
		data: detailProduct,
		status: detailStatus,
		error: detailError,
		isLoading: detailIsLoading,
	} = useGetDetailData(idx)

	const detailProductList = {
		detailProduct,
		detailStatus,
		detailError,
	}

	if (detailProduct === undefined) return
	if (detailStatus === 'error') return <ErrorFallback error={detailError} />

	return (
		<S.Wrapper>
			<S.MainContainer>
				{detailIsLoading ? (
					<>
						<ThumbnailSkeleton />
						<DescSkeleton />
					</>
				) : (
					<>
						<Thumbnail {...detailProductList} />
						<Description {...detailProductList} />
					</>
				)}
			</S.MainContainer>
			<Contents detailProduct={detailProduct} />
		</S.Wrapper>
	)
}

export default Detail

const Wrapper = styled.section`
	${WidthAutoCSS}
	margin: 6rem auto;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		margin: 3rem auto;
	}
`

const MainContainer = styled.section`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	margin-bottom:6rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${ColumnNumberCSS(1)}
	}

	& > span:first-of-type::before {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const S = {
	Wrapper,
	MainContainer,
}
