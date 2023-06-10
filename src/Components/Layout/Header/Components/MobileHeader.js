import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import { InterestBasket_Icon, RollBack_icon } from '../../../Icons/Icons'
import { useEffect } from 'react'
import { FlexBetweenCSS } from '../../../../Styles/common'

function MobileHeader({ onSideBar, setSelectedNav, setOnSideBar, userInfo }) {
	const navigate = useNavigate() // 네비게이션 추가
	const location = useLocation()
	const { pathname } = location

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return (
		<S.MobileHeaderWrapper userInfo={userInfo.token}>
			{userInfo.token && (
				<S.MobileIcon
					onClick={() => {
						if (onSideBar) {
							setOnSideBar(false)
						} else {
							navigate(-1)
						}
					}}
				>
					<RollBack_icon size="24" cursor="pointer" />
				</S.MobileIcon>
			)}
			<S.Logo
				onClick={() => {
					navigate('/')
					setSelectedNav(0)
					setOnSideBar(false)
					window.scrollTo(0, 0)
				}}
			>
				NEGO MARKET
			</S.Logo>
			{userInfo.token && (
				<S.MobileIcon
					onClick={() => {
						setOnSideBar(prev => !prev)
					}}
				>
					<InterestBasket_Icon size="24" cursor="pointer" />
				</S.MobileIcon>
			)}
		</S.MobileHeaderWrapper>
	)
}
export default MobileHeader

const MobileHeaderWrapper = styled.div`
	${FlexAlignCSS}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		&:first-of-type {
			width: 100%;
			height: 6rem;
			${FlexBetweenCSS}
			${({ userInfo }) =>
				userInfo
					? { justifyContent: 'space-between' }
					: { justifyContent: 'center !important' }}
		}

		&:last-of-type {
			width: 100%;
			top: 6rem;
		}
	}
`

/**
 * 모바일 아이콘 구역
 */
const MobileIcon = styled.div`
	display: none;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: block;

		& > svg {
			transition: color 1s;
			position: relative;
			z-index: 9999;
		}
	}
`

/**
 * 로고
 */
const Logo = styled.h1`
	color: ${({ theme }) => theme.COLOR.main};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	cursor: pointer;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
	}
`

const S = {
	MobileHeaderWrapper,
	MobileIcon,
	Logo,
}
