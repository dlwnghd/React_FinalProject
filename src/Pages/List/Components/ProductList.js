import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'

// 스켈레톤의 갯수
// 	전체물품 수 - 현재 화면에 랜더링된 물품 수 = Skeleton으로 나타낼 수 있는 수
// 	=> 첫번째 페이지를 호출할때는 몇개의 데이터가 올지 모름(고정 갯수 지정❓)
const lengthArray = new Array(20).fill(0)

function ProductList({
	data,
	isSuccess,
	hasNextPage,
	fetchNextPage,
	isFetching,
}) {
	const observerElem = useRef(null) // 타겟 요소

	// 옵저버 핸들러
	const handleObserver = useCallback(
		entries => {
			const [target] = entries
			if (target.isIntersecting && hasNextPage) {
				fetchNextPage()
			}
		},
		[fetchNextPage, hasNextPage],
	)

	useEffect(() => {
		const element = observerElem.current
		const option = { threshold: 0 }

		const observer = new IntersectionObserver(handleObserver, option)
		observer.observe(element)
		return () => observer.unobserve(element)
	}, [fetchNextPage, hasNextPage, handleObserver])

	const navigate = useNavigate()

	return (
		<S.ProductListWrapper>
			{isSuccess &&
				data?.pages.map(page =>
					page.product.map((item, idx) => {
						return (
							<ItemBox
								title={item.title}
								price={item.price}
								posterPath={item.img_url}
								tags={item.ProductsTags}
								isLiked={item.liked}
								key={idx}
								onClick={() => navigate(`/detail/${item.idx}`)}
							/>
						)
					}),
				)}
			{isFetching ? (
				<>
					{lengthArray.map((i, idx) => {
						return <MainSkeleton key={idx} />
					})}
				</>
			) : undefined}
			<div ref={observerElem}></div>
		</S.ProductListWrapper>
	)
}

export default ProductList

const ProductListWrapper = styled.div`
	width: 100%;
	margin-top: 4rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const S = {
	ProductListWrapper,
}
