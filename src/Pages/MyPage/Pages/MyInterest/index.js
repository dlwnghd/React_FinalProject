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
import { useNavigate } from 'react-router-dom'

function MyInterest() {
	const arr = Array.from('0123456789')
	const navigate = useNavigate()
	const { data, error, status, isLoading, isError, isRefetching } =
		useGetMyInterest({ page: 1 })

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
		</S.Wrapper>
	)
}

export default MyInterest

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const Container = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(4)};
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
