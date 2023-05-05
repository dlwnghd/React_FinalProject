import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import MainSkeleton from '../../../Components/ItemBox/ItemSkeleton'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import axios from 'axios'

function SearchList({
	changeResult,
	setChangeResult,
	search,
	page,
	setPage,
	filterOption,
}) {
	const navigate = useNavigate()
	const preventRef = useRef(false)
	const obsRef = useRef(null)
	const timeOutRef = useRef(null)

	useEffect(() => {
		// observer 생성 로직... 이해가 더 필요
		const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 })
		if (obsRef.current) observer.observe(obsRef.current)

		return () => {
			observer.disconnect()
		}
	}, [])

	useEffect(() => {
		// 컴포넌트가 unmount 되기 전에 timeout 함수가 실행되었다면 clear 해줍니다.
		return () => {
			if (timeOutRef.current) clearTimeout(timeOutRef.current)
		}
	}, [])

	const obsHandler = entries => {
		// 매개변수 entries는 무엇을 받아오나...?
		const target = entries[0]

		// isIntersecting...?
		if (target.isIntersecting && preventRef.current) {
			preventRef.current = false
			setPage(prev => prev + 1)
		}
	}

	useEffect(() => {
		const timerId = setTimeout(() => {
			getProduct()
		}, 200)

		timeOutRef.current = timerId
	}, [page])

	const getProduct = useCallback(async () => {
		try {
			const res = await axios.get('/api/products/search', {
				params: {
					search: search,
					page: page,
					pageSize: 10,
					filterOption: filterOption,
				},
			})
			setChangeResult(prev => [...prev, ...res.data])
			preventRef.current = true
		} catch (error) {
			console.log(error)
		}
	}, [page])

	return (
		<S.ResultList>
			{changeResult.map((item, idx) => {
				// isLoading 단계에서 skeleton UI...
				return !changeResult ? (
					<MainSkeleton />
				) : (
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
			<Observer className="" ref={obsRef}></Observer>
		</S.ResultList>
	)
}

export default SearchList

const ResultList = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(4)}

	@media screen and (max-width:${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const Observer = styled.div``

const S = {
	ResultList,
	Observer,
}
