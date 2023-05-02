import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	WidthAutoCSS,
} from '../../../../Styles/common'
import MY_PAGE_NAV_TYPE from '../../../../Consts/mypage-nav'
import { useNavigate } from 'react-router-dom'

function MyPageNav({ type }) {
	const navigate = useNavigate()

	return (
		<S.Wrapper>
			<S.Container>
				{MY_PAGE_NAV_TYPE[type].map(nav => (
					<S.Title
						key={nav.title}
						onClick={() => navigate(`${nav.path}`)}
						state={window.location.pathname === nav.path}
					>
						{nav.title}
					</S.Title>
				))}
			</S.Container>
		</S.Wrapper>
	)
}
export default MyPageNav

const Wrapper = styled.div`
	${WidthAutoCSS};
	${FlexAlignCSS};
	justify-content: flex-start;
`
const Container = styled.div`
	width: 30rem;
	${FlexBetweenCSS}
`
const Title = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	border-bottom: ${({ state }) =>
		state
			? '2px solid black'
			: '2px solid white'}; /* border-bottom 때문에 텍스트가 살짝 올라가는 걸 방지하기 위해 아닐 경우에도 white로 */
	letter-spacing: -0.1rem;
	cursor: pointer;
`

const S = { Wrapper, Container, Title }
