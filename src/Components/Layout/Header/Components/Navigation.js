import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'

function Navigation({ selectedNav, setSelectedNav }) {
	const navigate = useNavigate() // 네비게이션 추가

	return (
		<S.NavigationWrapper>
			<S.NavItem
				className={selectedNav === 1 ? 'selected' : ''} // Navigation 항목의 인덱스에 따라 클래스 추가
				onClick={() => {
					setSelectedNav(1) // 선택된 Navigation 항목의 인덱스 업데이트
					navigate('/list/freeMarket')
				}}
			>
				FREE MARKET
			</S.NavItem>
			<S.NavItem
				className={selectedNav === 2 ? 'selected' : ''} // Navigation 항목의 인덱스에 따라 클래스 추가
				onClick={() => {
					setSelectedNav(2) // 선택된 Navigation 항목의 인덱스 업데이트
					navigate('/list/usedTrade')
				}}
			>
				TRADE USED
			</S.NavItem>
		</S.NavigationWrapper>
	)
}

export default Navigation

/**
 * Header 하단
 */
const NavigationWrapper = styled.nav`
	display: flex;
	column-gap: 4rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
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
	color: ${({ theme }) => theme.COLOR.common.black};

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

const S = {
	NavigationWrapper,
	NavItem,
}
