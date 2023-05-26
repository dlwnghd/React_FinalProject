import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { ColumnNumberCSS, FlexCenterCSS, GridCenterCSS } from '../../../../Styles/common'
import useGetViewedProductsList from '../../../../Hooks/Queries/get-viewedProductList'
import ViewedItemBox from './ViewedItemBox'

function Sidebar({ onSideBar, setOnSideBar }) {
	const navigate = useNavigate()
	const slideRef = useRef()
	const { data, error, status, isLoading, isError, refetch } =
		useGetViewedProductsList()

	useEffect(() => {
		const $body = document.querySelector('body')

		if (window.innerWidth > 414) {
			slideRef.current.style.transform = 'translateX(0%)'
			$body.style.overflow = 'auto'
		} else if (onSideBar === true) {
			slideRef.current.style.transform = 'translateX(0%)'
			$body.style.overflow = 'hidden'
		} else if (onSideBar === false) {
			slideRef.current.style.transform = 'translateX(100%)'
			$body.style.overflow = 'auto'
		}
	}, [onSideBar])

	console.log(data)

	return (
		<S.SidebarWrapper ref={slideRef}>
			<S.SideBarTitleContainer>
				<h4>최근 본 상품</h4>
			</S.SideBarTitleContainer>
			<S.SideBarContainer>
				<S.ProductList>
					{data &&
						data.productList.map((item, idx) => {
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
										onClick={() => navigate(`/detail/${item.Product.idx}`)}
									/>
									{data.productList.length !== idx + 1 ? (
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
	top: 28.8rem;
	z-index: 99;
	height: 100%;
	overflow-y: auto;
	color: ${({ theme }) => theme.COLOR.common.black};
	transition: 0.5s ease-in-out;
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	height: 50%;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	transform: translateX(0%);
	width: 21rem;
	right: 5px;
	left: 84%;
	padding: 0rem 1rem 1rem;

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
	}
`

const SideBarTitleContainer = styled.div`
	padding: 2rem 0;
	position: sticky;
	top: 0px;
	z-index: 99999;
	background-color: ${({ theme }) => theme.COLOR.common.white};
`

const SideBarContainer = styled.ul``

const ProductList = styled.li`
	width: 100%;
	${FlexCenterCSS}
	${ColumnNumberCSS(4)};
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
