import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS, WidthAutoCSS } from '../../../Styles/common'
import { CiSearch, CiMenuBurger, CiShoppingBasket } from 'react-icons/ci'
import { useEffect, useRef, useState } from 'react'
import Sidebar from './Components/Sidebar'

function Header({ searchProduct }) {
	const navigate = useNavigate()

	const [product, setProduct] = useState('') // 검색할 물품 State관리용
	const [selectedNav, setSelectedNav] = useState(-1) // 선택된 Navigation 항목의 인덱스

	const [login, setLogin] = useState(true) // 로그인 Header 구현용 State

	const userMenu = useRef() // 사용자 드롭다운 이외의 영역 클릭시 닫는용 Ref
	const [dropdown, setDropdown] = useState(true) // 사용자 드롭다운 관리용

	const [hamburgerShow, setHamburgerShow] = useState(false) // 모바일 햄버거메뉴 활성화용

	/**
	 * 드롭다운 닫기 핸들러
	 */

	const dropdownCloseHandler = ({ target }) => {
		if (dropdown && userMenu.current && !userMenu.current.contains(target)) {
			setDropdown(false)
		}
	}

	useEffect(() => {
		window.addEventListener('click', dropdownCloseHandler)
		return () => {
			window.removeEventListener('click', dropdownCloseHandler)
		}
	})

	/**
	 * 검색내용 변경
	 */
	const onChangeSearch = e => {
		setProduct(e.target.value)
	}

	/**
	 * Enter 키 입력시 검색 기능
	 */
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onSubmitSearch()
			setSelectedNav(-1)
		}
	}

	/**
	 * 검색 기능
	 */
	const onSubmitSearch = () => {
		if (product == '') {
			alert('검색어를 입력해주세요')
			return
		}
		navigate(`/search/${product}`)
	}

	return (
		<S.HeaderWrapper>
			<S.HeaderSpace>
				{login ? (
					<S.UserContainer>
						<S.UserBox
							ref={userMenu}
							onClick={() => {
								setDropdown(prev => !prev)
							}}
						>
							<img src={'./user.png'} width="17" />
							<span>회원명</span>
						</S.UserBox>
						{dropdown && (
							<UserDropDownMenu>
								<span
									onClick={() => {
										navigate('/mypage-bank')
										setSelectedNav(-1)
									}}
								>
									마이페이지
								</span>
								<span
									onClick={() => {
										navigate('/mypage/useredit-userinfo')
										setSelectedNav(-1)
									}}
								>
									회원정보 수정
								</span>
								<span>채팅목록</span>
								<span
									onClick={() => {
										navigate('/')
										setSelectedNav(-1)
									}}
								>
									LOGOUT
								</span>
							</UserDropDownMenu>
						)}
					</S.UserContainer>
				) : (
					<S.Login_Join>
						<span
							onClick={() => {
								navigate('/login')
								setSelectedNav(-1)
							}}
						>
							login
						</span>
						<span
							onClick={() => {
								navigate('/signup')
								setSelectedNav(-1)
							}}
						>
							join
						</span>
					</S.Login_Join>
				)}
				<S.List>
					<div>
						<S.MobileIcon
							onClick={() => {
								setHamburgerShow(prev => !prev)
							}}
						>
							<CiMenuBurger
								style={{
									fontSize: '5.4rem',
									color: 'gray',
									cursor: 'pointer',
								}}
							/>
						</S.MobileIcon>
						<S.Logo
							onClick={() => {
								navigate('/')
								setSelectedNav(-1)
							}}
						>
							NEGO MARKET
						</S.Logo>
						<S.MobileIcon>
							<CiShoppingBasket
								style={{
									fontSize: '5.4rem',
									color: 'gray',
									cursor: 'pointer',
								}}
							/>
						</S.MobileIcon>
					</div>
					<S.SearchContainer>
						<CiSearch
							style={{
								position: 'absolute',
								color: 'gray',
							}}
						/>
						<input
							type="text"
							placeholder={'어떤 상품을 찾으시나요?'}
							onChange={onChangeSearch}
							onKeyDown={handleKeyPress}
							defaultValue={searchProduct} // 만약 검색 도중 새로고침이 일어나더라도 검색어가 남아있어야 함
							value={product}
						></input>
					</S.SearchContainer>
				</S.List>
				<Sidebar
					hamburgerShow={hamburgerShow}
					setHamburgerShow={setHamburgerShow}
					selectedNav={selectedNav}
					setSelectedNav={setSelectedNav}
				/>
				<S.Bottom>
					<S.NavItem
						className={selectedNav === 0 ? 'selected' : ''} // Navigation 항목의 인덱스에 따라 클래스 추가
						onClick={() => {
							setSelectedNav(0) // 선택된 Navigation 항목의 인덱스 업데이트
							navigate('/list/무료나눔리스트')
						}}
					>
						FREE MARKET
					</S.NavItem>
					<S.NavItem
						className={selectedNav === 1 ? 'selected' : ''} // Navigation 항목의 인덱스에 따라 클래스 추가
						onClick={() => {
							setSelectedNav(1) // 선택된 Navigation 항목의 인덱스 업데이트
							navigate('/list/중고거래리스트')
						}}
					>
						TRADE USED
					</S.NavItem>
					<S.NavItem
						className={selectedNav === 2 ? 'selected' : ''} // Navigation 항목의 인덱스에 따라 클래스 추가
						onClick={() => {
							setSelectedNav(2) // 선택된 Navigation 항목의 인덱스 업데이트
							navigate('/recent-price')
						}}
					>
						MARKET TREND
					</S.NavItem>
				</S.Bottom>
			</S.HeaderSpace>
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
	border-bottom: 0.1px solid #eeeeee;
	background-color: white;
	position: sticky;
	top: 0;
`

/**
 * Header공간
 */
const HeaderSpace = styled.div`
	${WidthAutoCSS};
	padding-top: 1rem;
`

/**
 * Header 상단
 */

const List = styled.div`
	text-align: center;
	height: 10rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	column-gap: 5rem;

	@media screen and (max-width: 440px) {
		flex-direction: column;
	}

	& > input {
		@media screen and (max-width: 440px) {
			position: relative;
			width: 100%;
			left: 0%;
			transform: translateX(0%);
		}
	}

	& > div {
		@media screen and (max-width: 440px) {
			width: 100%;
			display: flex;
			justify-content: space-between;
			top: 8rem;
		}
	}
`

/**
 * 로그인 / 회원가입
 */
const Login_Join = styled.div`
	text-align: right;

	& > span {
		cursor: pointer;
		margin: 0 1rem;
	}

	@media screen and (max-width: 440px) {
		display: none;
	}
`

/**
 * 검색창
 */
const SearchContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 33%;
	${FlexAlignCSS}
	top: 5.5rem;

	& > input {
		width: 100%;
		height: 4rem;
		box-sizing: border-box;
		border-radius: 2rem;
		text-indent: 4.4rem;
		border: 0.2rem solid #aaa;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}

	& > svg {
		position: absolute;
		left: 1rem;
		font-size: 2.8rem;
		color: black;
	}
`

/**
 * 로고
 */
const Logo = styled.h1`
	height: 100%;
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	cursor: pointer;
	line-height: 5;

	@media screen and (max-width: 440px) {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		line-height: 2.5;
	}
`

/**
 * Header 하단
 */
const Bottom = styled.nav`
	display: flex;
	column-gap: 4rem;
	height: 5.5rem;

	@media screen and (max-width: 440px) {
		display: none;
	}
`

/**
 * 네비게이션 아이템들
 */
const NavItem = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};

	/* 선택된 항목에만 box_shadow 추가 */
	&.selected {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		box-shadow: rgb(25, 31, 40) 0px -3px 0px inset;
	}
`

// /**
//  * 모바일 검색창
//  */
// const MobileSearchContainer = styled.div`
// 	display: none;
// 	width: 100%;
// 	position: relative;

// 	@media screen and (max-width: 440px) {
// 		display: block;
// 	}

// 	& > input {
// 		width: 100%;
// 		height: 4rem;
// 		box-sizing: border-box;
// 		border-radius: 2rem;
// 		text-indent: 4.4rem;
// 		border: 0.2rem solid #aaa;
// 		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
// 	}

// 	& > svg {
// 		position: absolute;
// 		left: 1rem;
// 		font-size: 2.8rem;
// 		color: black;
// 	}
// `

/**
 * 모바일 아이콘 구역
 */
const MobileIcon = styled.div`
	display: none;

	@media screen and (max-width: 440px) {
		display: block;
	}
`

const UserContainer = styled.div`
	& > * {
		cursor: pointer;
	}

	@media screen and (max-width: 440px) {
		display: none;
	}
`
const UserBox = styled.div`
	text-align: right;
	margin-top: 2px;
`
const UserDropDownMenu = styled.div`
	position: absolute;
	display: grid;
	background-color: #acacac;
	border: 1px solid black;
	border-radius: 5%;

	& > span {
		padding: 1rem;
		cursor: pointer;

		:hover {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			background-color: ${({ theme }) => theme.COLOR.hover};
		}
	}
`

const S = {
	HeaderWrapper,
	List,
	Login_Join,
	SearchContainer,
	Logo,
	Bottom,
	NavItem,
	MobileIcon,
	UserContainer,
	UserBox,
	UserDropDownMenu,
	HeaderSpace,
}
