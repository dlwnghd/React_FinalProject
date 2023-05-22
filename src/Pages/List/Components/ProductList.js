import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'

const lengthArray = new Array(20).fill(0)

function ProductList({
	currentURL,
	filterOption,
	data,
	isSuccess,
	fetchNextPage,
	isFetchingNextPage,
	hasNextPage,
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

	console.log('isFetching', isFetching)

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
			{hasNextPage && isFetching ? (
				<>
					{lengthArray.map((i, idx) => {
						return <MainSkeleton key={idx} />
					})}
				</>
			) : undefined}
			<S.Observer ref={observerElem}></S.Observer>
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
const Observer = styled.div``

const S = {
	ProductListWrapper,
	Observer,
}
