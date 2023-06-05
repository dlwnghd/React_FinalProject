import { useCallback, useEffect } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'
import { useNavigate } from 'react-router-dom'

function SearchResult({
	searchResult,
	isSuccess,
	skeletonUI,
	fetchNextPage,
	hasNextPage,
	isFetching,
}) {
	const observeRef = useRef(null)

	const observerCallback = useCallback(
		entries => {
			const target = entries[0]

			if (target.isIntersecting && hasNextPage) {
				fetchNextPage()
			}
		},
		[fetchNextPage, hasNextPage],
	)

	useEffect(() => {
		const observeElem = observeRef.current
		const observer = new IntersectionObserver(observerCallback, {
			threshold: 0.5,
		})
		if (observeElem) observer.observe(observeElem)

		return () => observer.unobserve(observeElem)
	}, [hasNextPage, observerCallback])

	const navigate = useNavigate()

	return (
		<S.Wrapper>
			{isSuccess &&
				searchResult.pages.map(page =>
					page.product.map((item, idx) => {
						return (
							<ItemBox
								key={idx}
								prod_idx={item.idx}
								title={item.title}
								price={item.price}
								posterPath={item.img_url}
								description={item.description}
								createdAt={item.createdAt}
								isLiked={item.liked}
								onClick={() => navigate(`/detail/${item.idx}`)}
							/>
						)
					}),
				)}
			{isFetching && skeletonUI.map((item, i) => <MainSkeleton key={i} />)}
			<div ref={observeRef}></div>
		</S.Wrapper>
	)
}

export default SearchResult

const Wrapper = styled.div`
	position: relative;
	${GridCenterCSS}
	${ColumnNumberCSS(4)}
	row-gap: 6rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const S = {
	Wrapper,
}
