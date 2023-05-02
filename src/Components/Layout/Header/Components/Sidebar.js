import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { FlexAlignCSS } from '../../../../Styles/common'

function Sidebar({ interestedProductShow, setInterestedProductShow }) {
	const navigate = useNavigate()
	const slideRef = useRef()

	useEffect(() => {
		if (interestedProductShow === false) {
			slideRef.current.style.transform = 'translateX(100%)'
		}
		if (interestedProductShow === true) {
			slideRef.current.style.transform = 'translateX(0%)'
		}
	})

	return (
		<S.InterestedProductMenu>
			<S.SideBarContainer ref={slideRef}></S.SideBarContainer>
		</S.InterestedProductMenu>
	)
}

export default Sidebar

const InterestedProductMenu = styled.div`
	${FlexAlignCSS}

	@media screen and (min-width: 441px) {
		display: none;
	}
`

const SideBarContainer = styled.nav`
	position: fixed;
	transition: 0.5s ease-in-out;
	transform: translateX(100%);
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
	color: black;
	width: 100%;
	z-index: 99;
	height: 100%;
	top: 0;
	left: 0;
`

const S = {
	InterestedProductMenu,
	SideBarContainer,
}
