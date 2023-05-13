import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { isNavigationAtom } from '../../../../Atoms/navigation.atom'
import { isScrollAtom } from '../../../../Atoms/scrollState.atom'
import { MobileNav } from '../../../../Consts/@mobileNavConfig'
import { FlexCenterCSS } from '../../../../Styles/common'

function MobileFooter() {
	const navigate = useNavigate()
	const [scroll, setScroll] = useRecoilState(isScrollAtom)
	const [footerSelect, setFooterSelect] = useRecoilState(isNavigationAtom)

	window.addEventListener('wheel', function (event) {
		if (event.deltaY > 0) {
			setScroll(true)
		} else if (event.deltaY < 0) {
			setScroll(false)
		} else if (document.documentElement.scrollTop <= 0) {
			setScroll(false)
		}
	})

	return (
		<S.NavigationWrapper className={scroll ? 'scroll' : ''}>
			<S.NavigationContainer className="navigation">
				<S.NavList>
					{MobileNav.map((nav, idx) => {
						return (
							<S.NavBox
								className={`list ${footerSelect === idx ? 'active' : ''}`}
								onClick={() => {
									navigate(`${nav.navigation}`)
									setFooterSelect(idx)
								}}
							>
								<div>
									<span className="icon">{nav.icon}</span>
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
export default MobileFooter

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
	Navigation,
	NavList,
	NavBox,
	Indicator,
}
