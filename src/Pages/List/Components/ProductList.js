import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'

let skeletonArrayLength = new Array(8).fill(0)

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

	if (data) {
		const lastPage = data.pages[data.pages.length - 1].pagination
		const remainingItems =
			lastPage.count - lastPage.curPage * 20 > 20
				? 20
				: lastPage.count - lastPage.curPage * 20

		if (remainingItems > 0) {
			skeletonArrayLength = new Array(remainingItems).fill(0)
		}
	}

	console.log(data)

	return (
		<S.ProductListWrapper>
			<MainSkeleton />
			{isSuccess &&
				data?.pages.map(page =>
					page.product.map((item, idx) => {
						return (
							<ItemBox
								title={item.title}
								price={item.price}
								posterPath={item.img_url}
								description={item.description}
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
					{skeletonArrayLength.map((i, idx) => {
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
