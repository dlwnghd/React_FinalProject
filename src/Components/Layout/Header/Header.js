import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS } from '../../../Styles/common'
import { CiSearch } from 'react-icons/ci'
import { useState } from 'react'
import SideBar from './Sidebar/Sidebar'

function Header({ searchProduct }) {
	const navigate = useNavigate()

	const [product, setProduct] = useState('') // 검색할 물품 State관리
	const [selectedNav, setSelectedNav] = useState(-1) // 선택된 Navigation 항목의 인덱스

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
			<S.Topper>
				<SideBar />
				<S.LogoContainer>
					<S.Logo
						onClick={() => {
							navigate('/')
							setSelectedNav(-1)
						}}
					>
						NEGO MARKET
					</S.Logo>
				</S.LogoContainer>
				<S.SearchContainer>
					<CiSearch
						style={{
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-50%)',
							left: '1rem',
							fontSize: '2.8rem',
							color: 'gray',
						}}
					/>
					<input
						type="text"
						placeholder={'어떤 상품을 찾으시나요?'}
						onChange={onChangeSearch}
						onKeyDown={handleKeyPress}
						defaultValue={searchProduct}
						key={searchProduct}
					></input>
				</S.SearchContainer>
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
			</S.Topper>
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
		</S.HeaderWrapper>
	)
}

export default Header

/**
 * 전체 Header
 */
const HeaderWrapper = styled.header`
	width: 100%;
	box-sizing: border-box;
	padding: 0 15%;
	padding-top: 1%;
	border-bottom: 0.1px solid #eeeeee;

	@media screen and (max-width: 440px) {
		position: fixed;
	}
`

/**
 * Header 상단
 */
const Topper = styled.div`
	height: 10rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	column-gap: 5rem;
`

/**
 * 로그인 / 회원가입
 */
const Login_Join = styled.div`
	display: flex;
	column-gap: 3rem;
	align-items: flex-start;

	& > span {
		cursor: pointer;
	}

	@media screen and (max-width: 440px) {
		display: none;
	}
`

/**
 * 검색창
 */
const SearchContainer = styled.div`
	width: 33%;
	position: relative;
	${FlexAlignCSS}
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
 * 로고 구역
 */
const LogoContainer = styled.div`
	display: flex;
	align-items: center;
`

/**
 * 로고
 */
const Logo = styled.h1`
	font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
	cursor: pointer;
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

const NavItem = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};

	/* 선택된 항목에만 box_shadow 추가 */
	&.selected {
		box-shadow: rgb(25, 31, 40) 0px -3px 0px inset;
	}
`

const S = {
	HeaderWrapper,
	Topper,
	Login_Join,
	SearchContainer,
	LogoContainer,
	Logo,
	Bottom,
	NavItem,
}
