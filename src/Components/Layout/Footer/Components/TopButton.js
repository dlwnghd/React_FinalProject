import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

function TopButton() {
	const [showButton, setShowButton] = useState(false)

	const onScrollToTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})
	}
	useEffect(() => {
		const handleShowButton = () => {
			if (window.scrollY > 500) {
				setShowButton(true)
			} else {
				setShowButton(false)
			}
		}
		window.addEventListener('scroll', handleShowButton)
		return () => {
			window.removeEventListener('scroll', handleShowButton)
		}
	}, [])

	return (
		showButton && (
			<S.ButtonBox>
				<S.Button onClick={onScrollToTop} type="button">
					<BsFillArrowUpCircleFill size="50" />
				</S.Button>
			</S.ButtonBox>
		)
	)
}
export default TopButton

const ButtonBox = styled.div`
	position: fixed;
	right: 5%;
	bottom: 5%;
	z-index: 1;
	width: 50px;
	height: 50px;
`

const Button = styled.button`
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme.COLOR.common.white};
	border-radius: 50%;
	background-color: ${({ theme }) => theme.COLOR.common.black};
	cursor: pointer;
`

const S = {
	ButtonBox,
	Button,
}
