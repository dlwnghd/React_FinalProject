import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import ItemBox from '../../../ItemBox/ItemBox'

function Sidebar({ onSideBar }) {
	const navigate = useNavigate()
	const slideRef = useRef()

	useEffect(() => {
		const $body = document.querySelector('body')
		if (onSideBar === false) {
			slideRef.current.style.transform = 'translateX(100%)'
			$body.style.overflow = 'auto'
		}
		if (onSideBar === true) {
			slideRef.current.style.transform = 'translateX(0%)'
			$body.style.overflow = 'hidden'
		}
	})

	return (
		<S.SidebarWrapper ref={slideRef}>
			<h4>관심 상품 목록</h4>
			<S.SideBarContainer>
				<S.ProductList>
					{productsMock.slice(0, 8).map((item, idx) => {
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
				</S.ProductList>
			</S.SideBarContainer>
		</S.SidebarWrapper>
	)
}

export default Sidebar

const SidebarWrapper = styled.nav`
	position: fixed;
	top: 7.8rem;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	padding: 12rem 6rem;
	color: ${({ theme }) => theme.COLOR.common.black};
	transition: 0.5s ease-in-out;
	transform: translateX(100%);
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};

	@media screen and (min-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: none;
	}
`

const SideBarContainer = styled.ul``

const ProductList = styled.li`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 2rem;
	}
`

const S = {
	SidebarWrapper,
	SideBarContainer,
	ProductList,
}
