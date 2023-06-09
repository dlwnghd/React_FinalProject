import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import useGetViewedProductsList from '../../../../Hooks/Queries/get-viewedProductList'
import ViewedItemBox from './ViewedItemBox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductApi from '../../../../Apis/productApi'
import { useCallback } from 'react'

function Sidebar({ onSideBar, setOnSideBar, userInfo }) {
	const navigate = useNavigate()
	const currentURL = useLocation().pathname
	const { idx: prod_idx } = useParams()
	const slideRef = useRef()
	const { data, error, status, isLoading, isError, refetch } =
		useGetViewedProductsList()

	useEffect(() => {
		function handleResize() {
			const $body = document.querySelector('body')

			if (window.innerWidth > 414) {
				slideRef.current.style.transform = 'translateX(0%)'
				$body.style.overflow = 'auto'
				slideRef.current.style.transition = 'none'
			} else if (onSideBar === true) {
				slideRef.current.style.transform = 'translateX(0%)'
				$body.style.overflow = 'hidden'
			} else if (onSideBar === false) {
				slideRef.current.style.transform = 'translateX(100%)'
				$body.style.overflow = 'auto'
			}
		}

		if (slideRef.current) {
			handleResize()
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [onSideBar])

	useEffect(() => {
		refetch()
	}, [userInfo])

	const queryClient = useQueryClient()
	const { mutateAsync } = useMutation(
		prod_idx => ProductApi.addViewedList(prod_idx),
		{
			onSuccess: async () => {
				await queryClient.refetchQueries()
			},
			onError: err => {
				console.log(err)
			},
		},
	)

	const fetchData = useCallback(
		async prod_idx => {
			if (currentURL.includes('detail')) {
				await mutateAsync(prod_idx)
			}
		},
		[prod_idx],
	)

	useEffect(() => {
		fetchData(prod_idx)
	}, [prod_idx])

	if (isLoading) return

	return (
		<S.SidebarWrapper ref={slideRef} pathURL={currentURL}>
			<S.SideBarTitleContainer>
				<h5>최근 본 상품</h5>
			</S.SideBarTitleContainer>
			<S.SideBarContainer>
				<S.ProductList>
					{data?.productList.map((item, idx) => {
						return (
							<>
								<ViewedItemBox
									refetch={refetch}
									title={item.Product.title}
									price={item.Product.price}
									status={item.Product.status}
									posterPath={item.Product.img_url}
									createdAt={item.Product.createdAt}
									key={item.idx}
									prod_idx={item.Product.idx}
									fetchData={fetchData}
									onClick={() => navigate(`/detail/${item.Product.idx}`)}
								/>
								{data?.productList.length !== idx + 1 ? (
									<S.ItemLine />
								) : undefined}
							</>
						)
					})}
				</S.ProductList>
			</S.SideBarContainer>
		</S.SidebarWrapper>
	)
}

export default Sidebar

const SidebarWrapper = styled.nav`
	position: fixed;
	top: 34.6rem;

	width: 12rem;
	z-index: 99;
	right: 0;
	overflow-y: auto;
	color: ${({ theme }) => theme.COLOR.common.black};
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	height: 36rem;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	transform: translateX(0%);

	box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);
	${({ pathURL }) =>
		pathURL.includes('search')
			? {
					display: 'block',
			  }
			: pathURL.includes('list')
			? {
					display: 'block',
			  }
			: { display: 'none' }}

	&::-webkit-scrollbar {
		display: none;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		top: 7.8rem;
		display: block;
		transform: translateX(100%);
		width: 100%;
		left: 0;
		padding: 0rem 6rem 12rem 6rem;
		height: 100%;
		transition: 0.5s ease-in-out;
	}
`

const SideBarTitleContainer = styled.div`
	padding: 1rem;
	position: sticky;
	z-index: 99999;
	color: ${({ theme }) => theme.COLOR.main};
	background-color: ${({ theme }) => theme.COLOR.common.black};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		padding: 4rem 1rem 2rem;
		background-color: ${({ theme }) => theme.COLOR.common.white};
	}
`

const SideBarContainer = styled.ul`
	width: 100%;
	padding: 1rem;
`

const ProductList = styled.li`
	width: 100%;
	flex-direction: column;
	row-gap: 1rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${GridCenterCSS}
		${ColumnNumberCSS(1)}
		column-gap: 2rem;
	}
`

const ItemLine = styled.hr`
	width: 100%;
	color: black;
`

const S = {
	SidebarWrapper,
	SideBarTitleContainer,
	SideBarContainer,
	ProductList,
	ItemLine,
}
