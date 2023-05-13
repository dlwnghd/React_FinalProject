import axios from 'axios'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'

function ProductList({
	currentURL,
	changeResult,
	setChangeResult,
	filterOption,
	page,
	setPage,
}) {
	const navigate = useNavigate()

	const preventRef = useRef(false) //옵저버 중복 실행 방지
	const obsRef = useRef(null) //observer Element
	const timeoutRef = useRef(null) //타이머 ID

	// 주소 변경시 Page번호 수정
	useEffect(() => {
		setPage(1)
	}, [currentURL, filterOption])

	useEffect(() => {
		//옵저버 생성
		const observer = new IntersectionObserver(onObsHandler, { threshold: 0.5 })
		if (obsRef.current) observer.observe(obsRef.current)
		return () => {
			observer.disconnect()
		}
	}, [])

	useEffect(() => {
		// 컴포넌트가 unmount 되기 전에 timeout 함수가 실행되었다면 clear 해줍니다.
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	// Page번호 변경시 디바운스 실행
	useEffect(() => {
		const timerId = setTimeout(() => {
			getProduct()
		}, 200) // 디바운스 시간 200ms
		timeoutRef.current = timerId
	}, [page])

	// 옵저버 핸들러
	const onObsHandler = entries => {
		const target = entries[0]
		if (target.isIntersecting && preventRef.current) {
			preventRef.current = false
			setPage(prev => prev + 1)
		}
	}

	// 상품 불러오기
	const getProduct = useCallback(async () => {
		if (page === 0) return
		try {
			console.log(filterOption)
			const res = await axios.get('/api/products', {
				params: {
					page: page,
					pageSize: 10,
					category: currentURL,
					filterOption: filterOption,
				},
			})
			setChangeResult(prev => [...prev, ...res.data]) //리스트 추가
			preventRef.current = true
		} catch (e) {
			console.error(e)
		}
	}, [page])

	return (
		<S.ProductListWrapper>
			<MainSkeleton />
			{changeResult.map((item, idx) => {
				return (
					<ItemBox
						title={item.title}
						price={item.price}
						posterPath={item.image_url}
						context={item.description}
						isLiked={item.liked}
						createdAt={item.createdAt}
						key={idx}
						onClick={() => navigate(`/detail/${item.idx}`)}
					/>
				)
			})}
			<li className="" ref={obsRef} />
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
