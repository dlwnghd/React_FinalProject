import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { isNavigationAtom } from '../../../../Atoms/navigation.atom'
import { isScrollAtom } from '../../../../Atoms/scrollState.atom'
import { userInfoAtom } from '../../../../Atoms/userInfo.atom'
import { FlexCenterCSS } from '../../../../Styles/common'
import {
	Chatting_Icon,
	FreeMarket_Icon,
	Home_Icon,
	Profile_Icon,
	TradeUsed_Icon,
} from '../../../Icons/Icons'

function MobileFooterNavigation() {
	const navigate = useNavigate()
	const [scroll, setScroll] = useRecoilState(isScrollAtom)
	const [footerSelect, setFooterSelect] = useRecoilState(isNavigationAtom)
	const userInfo = useRecoilValue(userInfoAtom)

	let touchStart = 0
	let touchEnd = 0

	// 모바일 터치 이벤트리스너
	window.addEventListener('touchstart', event => {
		touchStart = event.changedTouches[0].clientY
	})

	window.addEventListener('touchend', event => {
		touchEnd = event.changedTouches[0].clientY

		if (touchEnd - touchStart > -10) {
			setScroll(false)
		} else if (touchEnd - touchStart < -10) {
			setScroll(true)
		}
	})

	const MobileNav = [
		{
			text: '홈',
			navigation: '/',
			icon: <Home_Icon />,
		},
		{
			text: '무료',
			navigation: '/list/freeMarket',
			icon: <FreeMarket_Icon />,
		},
		{
			text: '네고',
			navigation: '/list/usedTrade',
			icon: <TradeUsed_Icon />,
		},
		{
			text: '채팅',
			navigation: '/chat',
			icon: <Chatting_Icon />,
		},
		{
			text: '내 정보',
			navigation: '/mypage-bank',
			icon:
				Object.keys(userInfo).length !== 0 && userInfo.profileUrl ? (
					<img
						style={{ width: '28px', borderRadius: '50%' }}
						src={userInfo.profileUrl}
					/>
				) : (
					<Profile_Icon size="28" />
				),
		},
	]

	return (
		<S.NavigationWrapper className={scroll ? 'scroll' : ''}>
			<S.NavigationContainer className="navigation">
				<S.NavList>
					{MobileNav.map((nav, idx) => {
						return (
							<S.NavBox
								key={idx}
								className={`list ${footerSelect === idx ? 'active' : ''}`}
								onClick={() => {
									navigate(`${nav.navigation}`)
									setFooterSelect(idx)
								}}
							>
								<div>
									<span className="icon">{nav.icon}</span>
									{idx === 3 && (
										<S.IssueBox
											className={`${footerSelect === idx ? 'active' : ''}`}
										/>
									)}
									<span className="text">{nav.text}</span>
								</div>
							</S.NavBox>
						)
					})}
					<S.Indicator className="indicator" />
				</S.NavList>
			</S.NavigationContainer>
		</S.NavigationWrapper>
	)
}
export default MobileFooterNavigation

const NavigationWrapper = styled.div`
	display: none;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	width: 100%;
	background: black;
	border-top: 1.3rem solid ${({ theme }) => theme.COLOR.main};
	transition: 0.5s ease;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: block;
	}

	&.scroll {
		bottom: -110px;
	}
`

const NavigationContainer = styled.div`
	position: relative;
	width: 400px;
	height: 70px;
	background: black;
	${FlexCenterCSS};
	border-radius: 10px;
	margin: auto;
`

const NavList = styled.ul`
	display: flex;
	width: 350px;
`

const NavBox = styled.li`
	position: relative;
	list-style: none;
	width: 70px;
	height: 70px;
	z-index: 1;

	& > div {
		position: relative;
		${FlexCenterCSS};
		flex-direction: column;
		width: 100%;
		text-align: center;
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}

	& > div .icon {
		position: relative;
		display: block;
		line-height: 75px;
		font-size: 3.5rem;
		text-align: center;
		transition: 0.5s;
		color: ${({ theme }) => theme.COLOR.common.white};
	}

	&.active > div .icon {
		transform: translateY(-32px);
		color: ${({ theme }) => theme.COLOR.common.black};
	}

	& > div .text {
		position: absolute;
		color: ${({ theme }) => theme.COLOR.common.white};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		font-size: 0.75em;
		letter-spacing: 0.05em;
		transition: 0.5s;
		opacity: 0;
		transform: translateY(20px);
	}

	&.active > div .text {
		opacity: 1;
		transform: translateY(10px);
	}

	${props =>
		Array.from({ length: 5 }).map(
			(_, index) =>
				`&:nth-child(${
					index + 1
				}).active ~ .indicator {transform: translateX(calc(70px * ${index}));}`,
		)}
`

const IssueBox = styled.span`
	position: absolute;
	transform: translate(1.1rem, -1.8rem);
	background: red;
	border: 1px solid ${({ theme }) => theme.COLOR.common.white};
	border-radius: 2rem;
	padding: 0.5rem;
	color: ${({ theme }) => theme.COLOR.common.white};
	transition: 0.5s;

	&.active {
		transform: translate(1.1rem, -5.8rem);
		color: ${({ theme }) => theme.COLOR.common.black};
	}
`

const Indicator = styled.div`
	position: absolute;
	top: -50%;
	width: 70px;
	height: 70px;
	background: ${({ theme }) => theme.COLOR.main};
	border-radius: 50%;
	border: 6px solid ${({ theme }) => theme.COLOR.main};
	transition: 0.5s;

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: -22px;
		width: 20px;
		height: 20px;
		background: transparent;
		border-top-right-radius: 20px;
		box-shadow: 1px -10px 0 0 ${({ theme }) => theme.COLOR.main};
	}

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		right: -22px;
		width: 20px;
		height: 20px;
		background: transparent;
		border-top-left-radius: 20px;
		box-shadow: -1px -10px 0 0 ${({ theme }) => theme.COLOR.main};
	}
`

const S = {
	NavigationWrapper,
	NavigationContainer,
	NavList,
	NavBox,
	IssueBox,
	Indicator,
}
