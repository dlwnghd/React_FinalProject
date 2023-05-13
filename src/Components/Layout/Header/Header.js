import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import { useEffect, useState } from 'react'
import Sidebar from './Components/Sidebar'
import { useRecoilState } from 'recoil'
import { isNavigationAtom } from '../../../Atoms/navigation.atom'
import { isOnSideBar } from '../../../Atoms/sideBar.atom'
import { isScrollAtom } from '../../../Atoms/scrollState.atom'
import UserBar from './Components/UserBar'
import NonUserBar from './Components/NonUserBar'
import HeaderSearchBar from './Components/Search'
import MobileHeader from './Components/MobileHeader'
import Navigation from './Components/Navigation'

function Header() {
	const NavigationFilter = ['freeMarket', 'usedTrade', 'chat', 'mypage'] // 네비게이션 Filter

	const navigate = useNavigate() // 네비게이션 추가

	const currentURL = useLocation().pathname // 현재 URL 기억 State (0: 무료, 1: 중고)

	const [login, setLogin] = useState(true) // 로그인 Header 구현용 State

	const [scroll, setScroll] = useRecoilState(isScrollAtom) // 스크롤 상태관리
	const [onSideBar, setOnSideBar] = useRecoilState(isOnSideBar) // 모바일 관심상품메뉴 활성화용
	const [selectedNav, setSelectedNav] = useRecoilState(isNavigationAtom) // 선택된 Navigation 항목의 인덱스

	// 현재 URL 변경시
	useEffect(() => {
		console.log('✅', currentURL)
		const foundIndex = NavigationFilter.findIndex(item =>
			currentURL.includes(item),
		)
		setSelectedNav(foundIndex !== -1 ? foundIndex + 1 : 0)
	}, [currentURL])

	// 스크롤 이벤트리스너
	window.addEventListener('wheel', function (event) {
		if (event.deltaY > 0) {
			setScroll(true)
		} else if (event.deltaY < 0) {
			setScroll(false)
		} else if (document.documentElement.scrollTop <= 0) {
			setScroll(false)
		}
	})

	// url 변경시 스크롤 최상단으로 이동
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [navigate])

	return (
		<S.HeaderWrapper className={scroll ? 'scroll' : ''}>
			<Sidebar onSideBar={onSideBar} />
			<S.HeaderContainer>
				{login ? (
					<UserBar setSelectedNav={setSelectedNav} />
				) : (
					<NonUserBar setSelectedNav={setSelectedNav} />
				)}
				<S.List>
					<MobileHeader
						setSelectedNav={setSelectedNav}
						setOnSideBar={setOnSideBar}
					/>
					<HeaderSearchBar setSelectedNav={setSelectedNav} />
				</S.List>
				<Navigation selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
			</S.HeaderContainer>
		</S.HeaderWrapper>
	)
}

export default Header

/**
 * 전체 Header
 */
const HeaderWrapper = styled.header`
	position: relative;
	z-index: 9999;
	width: 100%;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	border-bottom: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[100]};
	position: sticky;
	top: 0;
	padding: 2rem 0 0;
	transition: 0.5s ease;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		&.scroll {
			top: -50px;
		}
	}
`

/**
 * Header공간
 */
const HeaderContainer = styled.div`
	${WidthAutoCSS};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		padding-bottom: 2rem;
	}
`

/**
 * Header 상단
 */
const List = styled.div`
	position: relative;
	text-align: center;
	height: 10rem;
	width: 100%;
	${FlexBetweenCSS}
	margin-bottom:2rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		flex-direction: column;
	}

	& > input {
		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			position: relative;
			width: 100%;
			left: 0%;
			transform: translateX(0%);
		}
	}

	& > div {
		${FlexAlignCSS}
	}

	& > div:first-of-type {
		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			width: 100%;
			height: 6rem;
			${FlexBetweenCSS}
		}
	}

	& > div:last-of-type {
		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			width: 100%;
			top: 6rem;
		}
	}
`

const S = {
	HeaderWrapper,
	List,
	HeaderContainer,
}