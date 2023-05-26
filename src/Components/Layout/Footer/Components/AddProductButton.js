import { useNavigate } from 'react-router'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { isScrollAtom } from '../../../../Atoms/scrollState.atom'
import { FlexCenterCSS } from '../../../../Styles/common'
import { AddProduct_Icon } from '../../../Icons/Icons'

function AddProductButton() {
	const navigate = useNavigate()
	const [scroll, setScroll] = useRecoilState(isScrollAtom)

	window.addEventListener('wheel', function (event) {
		if (event.deltaY > 0) {
			setScroll(true)
		} else if (event.deltaY < 0) {
			setScroll(false)
		} else if (document.documentElement.scrollTop <= 0) {
			setScroll(false)
		}
	})

	/**
	 * 상품 추가 기능
	 */
	const onAddProduct = () => {
		navigate(`/register/지금라우팅이뭔가받아야하는상태이긴해서`)
	}

	return (
		<S.ButtonBox className={scroll ? 'scroll' : ''}>
			<S.Button type="button" onClick={() => onAddProduct()}>
				<AddProduct_Icon size="50" />
			</S.Button>
		</S.ButtonBox>
	)
}
export default AddProductButton

const ButtonBox = styled.div`
	position: fixed;
	right: 5%;
	bottom: 90px;
	z-index: 1;
	width: fit-content;
	height: fit-content;
	transition: 0.5s ease;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		&.scroll {
			bottom: 25px;
		}
	}
`

const Button = styled.div`
	${FlexCenterCSS};
	width: 100%;
	height: 100%;
	color: white;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	color: ${({ theme }) => theme.COLOR.main};
	cursor: pointer;
	transition: 0.3s ease;

	&:hover {
		scale: 1.2;
		transform: rotate(-180deg);
	}
`

const S = {
	ButtonBox,
	Button,
}
