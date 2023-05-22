import { useEffect } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'
import { useNavigate } from 'react-router-dom'

const lengthArray = new Array(20).fill(0)

function SearchResult({
	searchData,
	status,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}) {
	const observeRef = useRef(null)
	const navigate = useNavigate()

	const observerCallback = entries => {
		const target = entries[0]

		if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}

	console.log(hasNextPage)

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, {
			threshold: 1,
		})
		if (observeRef.current) observer.observe(observeRef.current)

		return () => {
			if (observeRef.current) observer.unobserve(observeRef.current)
		}
	}, [hasNextPage])

	return (
		<S.Wrapper>
			{!isFetchingNextPage
				? searchData.pages.map(page =>
						page.product.map((item, idx) => {
							return (
								<ItemBox
									title={item.title}
									price={item.price}
									posterPath={item.img_url}
									context={item.script}
									isLiked={item.liked}
									key={idx}
									onClick={() => navigate(`/detail/${item.idx}`)}
								/>
							)
						}),
				  )
				: lengthArray.map((item, idx) => {
						return <MainSkeleton key={idx} />
				  })}
			<Observer ref={observeRef}>옵저버 테스팅</Observer>
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

const Observer = styled.div`
	position: absolute;
	width: 100%;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	left: 0;
	bottom: 0;
	background: ${({ theme }) => theme.COLOR.common.gray[100]};
`

const S = {
	Wrapper,
	Observer,
}
