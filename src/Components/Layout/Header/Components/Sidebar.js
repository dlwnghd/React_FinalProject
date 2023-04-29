import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { FlexAlignCSS } from '../../../../Styles/common'

function Sidebar({
	hamburgerShow,
	setHamburgerShow,
	selectedNav,
	setSelectedNav,
}) {
	const navigate = useNavigate()
	const slideRef = useRef()

	useEffect(() => {
		if (hamburgerShow === false) {
			slideRef.current.style.transform = 'translateX(-100%)'
		}
		if (hamburgerShow === true) {
			slideRef.current.style.transform = 'translateX(0%)'
		}
	})

	return (
		<S.HamburgerMenu>
			<S.SideBarContainer ref={slideRef}>
				<ul>
					<li
						className={selectedNav === 0 ? 'selected' : ''}
						onClick={() => {
							navigate('/list/무료나눔리스트')
							setHamburgerShow(false)
							setSelectedNav(0)
						}}
					>
						FREE MARKET
					</li>
					<li
						className={selectedNav === 1 ? 'selected' : ''}
						onClick={() => {
							navigate('/list/중고거래리스트')
							setHamburgerShow(false)
							setSelectedNav(1)
						}}
					>
						TRADE USED
					</li>
					<li
						className={selectedNav === 2 ? 'selected' : ''}
						onClick={() => {
							navigate('/recent-price')
							setHamburgerShow(false)
							setSelectedNav(2)
						}}
					>
						MARKET TREND
					</li>
				</ul>
			</S.SideBarContainer>
		</S.HamburgerMenu>
	)
}

export default Sidebar

const HamburgerMenu = styled.div`
	${FlexAlignCSS}

	@media screen and (min-width: 441px) {
		display: none;
	}
`

const SideBarContainer = styled.nav`
	position: fixed;
	transition: 0.5s ease-in-out;
	transform: translateX(-100%);
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
	color: black;
	width: 100%;
	z-index: 99;
	height: 100%;
	top: 8rem;
	left: 0;

	& > ul {
		padding: 12rem 4rem;
	}

	& > ul > li {
		margin-bottom: 4rem;
		cursor: pointer;

		/* 선택된 항목에만 box_shadow 추가 */
		&.selected {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			box-shadow: rgb(25, 31, 40) 0px -3px 0px inset;
		}
	}
`

const S = {
	HamburgerMenu,
	SideBarContainer,
}
