import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	WidthAutoCSS,
} from '../../../Styles/common'
import { useEffect, useRef, useState } from 'react'
import Sidebar from './Components/Sidebar'
import {
	InterestBasket_Icon,
	Profile_Icon,
	Search_Icon,
	RollBack_icon,
} from '../../Icons/Icons'

function Header({ searchProduct }) {
	const navigate = useNavigate()

	const [product, setProduct] = useState('') // 검색할 물품 State관리용
	const [selectedNav, setSelectedNav] = useState(-1) // 선택된 Navigation 항목의 인덱스

	const [login, setLogin] = useState(false) // 로그인 Header 구현용 State

	const userMenu = useRef() // 사용자 드롭다운 이외의 영역 클릭시 닫는용 Ref
	const [dropdown, setDropdown] = useState(true) // 사용자 드롭다운 관리용

	const [interestedProductShow, setInterestedProductShow] = useState(false) // 모바일 햄버거메뉴 활성화용

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
							<Profile_Icon size="28" />
							<span>99+</span>
							<p>회원명</p>
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
						<S.MobileIcon onClick={() => navigate(-1)}>
							<RollBack_icon
								size="24"
								color={interestedProductShow ? 'black' : 'white'}
								cursor="pointer"
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
						<S.MobileIcon
							onClick={() => {
								setInterestedProductShow(prev => !prev)
							}}
						>
							<InterestBasket_Icon
								size="24"
								color={interestedProductShow ? 'black' : 'white'}
								cursor="pointer"
							/>
						</S.MobileIcon>
					</div>
					<S.SearchContainer>
						<Search_Icon color="black" position="absolute" />
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
					interestedProductShow={interestedProductShow}
					setInterestedProductShow={setInterestedProductShow}
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
	background-color: ${({ theme }) => theme.COLOR.common.black};
	position: sticky;
	top: 0;
	padding: 2rem 0 0;
`

/**
 * Header공간
 */
const HeaderSpace = styled.div`
	${WidthAutoCSS};

	@media screen and (max-width: 440px) {
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
		${FlexAlignCSS}
	}

	& > div:first-of-type {
		@media screen and (max-width: 440px) {
			width: 100%;
			height: 6rem;
			${FlexBetweenCSS}
		}
	}

	& > div:last-of-type {
		@media screen and (max-width: 440px) {
			width: 100%;
			top: 6rem;
		}
	}
`

/**
 * 로그인 / 회원가입
 */
const Login_Join = styled.div`
	height: 4rem;
	color: white;
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
	width: 33.3%;
	${FlexAlignCSS}

	& > input {
		width: 100%;
		height: 4rem;
		color: ${({ theme }) => theme.COLOR.common.black};
		box-sizing: border-box;
		border-radius: 2rem;
		text-indent: 4.4rem;
		background: white;
		border: none;
		outline: none;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}

	& > svg {
		position: absolute;
		left: 1rem;
		font-size: 2.8rem;
		color: ${({ theme }) => theme.COLOR.common.black};
	}
`

/**
 * 로고
 */
const Logo = styled.h1`
	color: ${({ theme }) => theme.COLOR.main};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	cursor: pointer;

	@media screen and (max-width: 440px) {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
	}
`

/**
 * Header 하단
 */
const Bottom = styled.nav`
	display: flex;
	column-gap: 4rem;
	/* height: 5.5rem; */

	@media screen and (max-width: 440px) {
		display: none;
	}
`

/**
 * 네비게이션 아이템들
 */
const NavItem = styled.div`
	position: relative;
	${FlexAlignCSS}
	cursor: pointer;
	padding: 2rem 0;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	color: ${({ theme }) => theme.COLOR.common.white};

	/* 선택된 항목에만 box_shadow 추가 */
	&.selected {
		color: ${({ theme }) => theme.COLOR.main};

		&::after {
			position: absolute;
			bottom: 0;
			content: '';
			width: 100%;
			height: 0.3rem;
			background: ${({ theme }) => theme.COLOR.main};
		}
	}
`

/**
 * 모바일 아이콘 구역
 */
const MobileIcon = styled.div`
	display: none;

	@media screen and (max-width: 440px) {
		display: block;

		& > svg {
			transition: color 1s;
			position: relative;
			z-index: 9999;
		}
	}
`

const UserContainer = styled.div`
	height: 4rem;
	${FlexAlignCSS}
	justify-content: flex-end;
	color: ${({ theme }) => theme.COLOR.common.white};

	& > * {
		cursor: pointer;
	}

	@media screen and (max-width: 440px) {
		display: none;
	}
`
const UserBox = styled.div`
	${FlexAlignCSS};
	height: 100%;

	& > svg {
		margin-right: 1rem;
	}

	& > span {
		position: absolute;
		transform: translate(2.2rem, -1rem);
		background: red;
		border: 1px solid white;
		border-radius: 50rem;
		padding: 0px 5px;
	}

	& > p {
		margin-left: 2.5rem;
	}
`
const UserDropDownMenu = styled.div`
	position: absolute;
	display: grid;
	background-color: #acacac;
	border: 1px solid black;
	border-radius: 5%;
	top: 25%;
	z-index: 9999;

	& > span {
		padding: 1rem;
		border: 1px solid white;
		cursor: pointer;
		border-radius: 5%;

		:hover {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			background-color: ${({ theme }) => theme.COLOR.hover};
			border: 1px solid white;
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
