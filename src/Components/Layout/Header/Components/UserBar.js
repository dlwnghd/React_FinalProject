import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import { Profile_Icon } from '../../../Icons/Icons'

function UserBar({ setSelectedNav }) {
	const navigate = useNavigate() // 네비게이션 추가
	const userMenu = useRef() // 사용자 드롭다운 이외의 영역 클릭시 닫는용 Ref

	const [dropdown, setDropdown] = useState(false) // 사용자 드롭다운 관리용
	/**
	 * 드롭다운 닫기 핸들러
	 */
	const dropdownCloseHandler = ({ target }) => {
		if (dropdown && userMenu.current && !userMenu.current.contains(target)) {
			setDropdown(false)
		}
	}

	// 회원정보 드롭다운 관리
	useEffect(() => {
		window.addEventListener('click', dropdownCloseHandler)
		return () => {
			window.removeEventListener('click', dropdownCloseHandler)
		}
	})

	return (
		<S.UserWrapper>
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
				<S.UserDropDownMenu>
					<span
						onClick={() => {
							navigate('/mypage-bank')
							setSelectedNav(5)
						}}
					>
						마이페이지
					</span>
					<span
						onClick={() => {
							navigate('/mypage/useredit-userinfo')
							setSelectedNav(5)
						}}
					>
						회원정보 수정
					</span>
					<span>채팅목록</span>
					<span
						onClick={() => {
							navigate('/')
							setSelectedNav(4)
						}}
					>
						LOGOUT
					</span>
				</S.UserDropDownMenu>
			)}
		</S.UserWrapper>
	)
}

export default UserBar

const UserWrapper = styled.div`
	height: 4rem;
	${FlexAlignCSS}
	justify-content: flex-end;
	color: ${({ theme }) => theme.COLOR.common.white};

	& > * {
		cursor: pointer;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: none;
	}
`

const UserBox = styled.div`
	${FlexAlignCSS};
	height: 100%;
	color: ${({ theme }) => theme.COLOR.common.black};

	& > svg {
		margin-right: 1rem;
	}

	& > span {
		position: absolute;
		transform: translate(2.2rem, -1rem);
		background: red;
		border: 1px solid ${({ theme }) => theme.COLOR.common.white};
		border-radius: 50rem;
		padding: 0px 5px;
		color: ${({ theme }) => theme.COLOR.common.white};
	}

	& > p {
		margin-left: 2.5rem;
	}
`

const UserDropDownMenu = styled.div`
	position: absolute;
	display: grid;
	background-color: ${({ theme }) => theme.COLOR.common.gray[300]};
	border: 1px solid ${({ theme }) => theme.COLOR.common.white};
	border-radius: 5%;
	top: 25%;
	z-index: 9999;
	width: 12rem;

	& > span {
		padding: 1rem;
		border: 1px solid ${({ theme }) => theme.COLOR.common.white};
		cursor: pointer;
		border-radius: 5%;

		:hover {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			background-color: ${({ theme }) => theme.COLOR.hover};
			border: 1px solid ${({ theme }) => theme.COLOR.common.white};
		}
	}
`

const S = {
	UserWrapper,
	UserBox,
	UserDropDownMenu,
}
