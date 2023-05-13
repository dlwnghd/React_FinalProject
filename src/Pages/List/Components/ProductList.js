import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ProductList({ currentURL, filterOption }) {
	const [changeResult, setChangeResult] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const timeoutRef = useRef(null)
	const observeRef = useRef(null) // 타겟 요소

	// api 호출
	// 엣지 케이스 [api 중복 요청]
	// 데이터가 입혀지지 않은 상황에서 observer의 노출이 page를 변경 그리고 호출

	// 유저의 경험을 향상시키기 위한 디바운싱
	useEffect(() => {
		const timerID = setTimeout(() => {
			getProducts()
		}, 200)

		timeoutRef.current = timerID
		// 언마운트 되었을 때, timerID를 클리어 시킨다 ?
		// 데이터 호출 이후, 바로 실행 종료
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [page])

	// 의존성 배열에 따라 list & page 초기화
	useEffect(() => {
		setChangeResult([])
		setPage(0)
	}, [currentURL, filterOption])

	// api 선언
	const getProducts = useCallback(async () => {
		if(page === 0) return setPage(1)
		try {
			const res = await axios.get('/api/products', {
				params: {
					page: page,
					pageSize: 10,
					category: currentURL,
					filterOption: filterOption,
				},
			})
			setChangeResult(prev => [...prev, ...res.data])
			setIsLoading(true)
		} catch (err) {
			console.log(err)
		}
	}, [page])

	// 옵저버 관측시, 실행
	const observeCallback = entries => {
		const target = entries[0]
		if (target.isIntersecting && isLoading === true) {
			setPage(prev => prev + 1)
		}
	}

	// 옵저버 생성 및 관측
	useEffect(() => {
		if (isLoading === true) {
			const observer = new IntersectionObserver(observeCallback, {
				threshold: 0.5,
			})
			if (observeRef.current) observer.observe(observeRef.current)
			return () => {
				observer.disconnect()
				setIsLoading(false)
			}
		}
	}, [isLoading])

	const navigate = useNavigate()

	return (
		<S.ProductListWrapper>
			{changeResult.map((item, idx) => {
				return (
					<ItemBox
						title={item.title}
						price={item.price}
						posterPath={item.image_url}
						context={item.script}
						isLiked={item.liked}
						key={idx}
						onClick={() => navigate(`/detail/${item.idx}`)}
					/>
				)
			})}
			<S.Observer ref={observeRef}></S.Observer>
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
