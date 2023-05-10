import styled from 'styled-components'
import { Outlet, useNavigate } from 'react-router-dom'
import { FlexAlignCSS, WidthAutoCSS } from '../../../../../Styles/common'

const MY_PAGE_NAV_TYPE = {
	myPage: [
		{
			title: '가계부',
			path: '/mypage-bank',
		},
		{
			title: '등록상품',
			path: '/mypage-register',
		},
		{
			title: '관심상품',
			path: '/mypage-interest',
		},
	],
	userEdit: [
		{
			title: '프로필 수정',
			path: '/mypage/useredit-userinfo',
		},
		{
			title: '비밀번호 변경',
			path: '/mypage/useredit-changepw',
		},
	],
}

function MyPageNav({ type }) {
	const navigate = useNavigate()

	return (
		<>
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
			<Outlet />
		</>
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
	${FlexAlignCSS}
	margin: 4rem 0;
	column-gap: 4rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin: 3rem 0;
	}
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
