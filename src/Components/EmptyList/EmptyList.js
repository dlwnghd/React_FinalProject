import { useLocation, useNavigate } from 'react-router-dom'
import getEmptyListMessage from '../../Utils/getEmptyListMessage'
import { FlexCenterCSS, WidthAutoCSS } from '../../Styles/common'
import styled from 'styled-components'
import Button from '../Button/Button'

function EmptyList() {
	const { pathname } = useLocation()
	const path = pathname.substring(1)
	const navigate = useNavigate()
	const { title, content } = getEmptyListMessage(path)

	const onClickHandler = () => {
		if (
			path === 'list/freeMarket' ||
			path === 'list/usedTrade' ||
			path === 'mypage-register'
		) {
			navigate('/register')
		} else if (path === 'mypage-interest') {
			navigate('/list/freeMarket')
		} else if (path === 'mypage-review') {
			navigate('/list/usedTrade')
		}
	}

	return (
		<S.Wrapper>
			<S.Container>
				<h3>{title}</h3>
				<Button shape={'soft'} onClick={onClickHandler}>
					{content}
				</Button>
			</S.Container>
		</S.Wrapper>
	)
}

export default EmptyList
const Wrapper = styled.div`
	${WidthAutoCSS}
`

const Container = styled.div`
	padding: 20rem 0;
	${FlexCenterCSS}
	flex-direction: column;

	& > h3 {
		margin-bottom: 4rem;
	}
`
const S = { Wrapper, Container }
