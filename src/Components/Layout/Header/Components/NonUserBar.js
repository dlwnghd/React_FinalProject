import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function NonUserBar({ setSelectedNav }) {
	const navigate = useNavigate() // 네비게이션 추가
	const { pathname } = useLocation() // 이전 경로

	return (
		<S.LoginJoinWrapper>
			<S.LoginJoinContainer>
				<span
					onClick={() => {
						navigate('/login'),
							{
								state: {
									from: pathname,
								},
							}
						setSelectedNav(1)
					}}
				>
					login
				</span>
				<span
					onClick={() => {
						navigate('/signup'),
							{
								state: {
									from: pathname,
								},
							}
						setSelectedNav(1)
					}}
				>
					join
				</span>
			</S.LoginJoinContainer>
		</S.LoginJoinWrapper>
	)
}

export default NonUserBar

const LoginJoinWrapper = styled.div`
	height: 4rem;
	color: ${({ theme }) => theme.COLOR.common.black};
	text-align: right;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: none;
	}
`

const LoginJoinContainer = styled.div`
	display: flex;
	justify-content: flex-end;

	& > span {
		width: 40px;
		cursor: pointer;

		&:hover {
			color: ${({ theme }) => theme.COLOR.main};
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		}
	}
`

const S = {
	LoginJoinWrapper,
	LoginJoinContainer,
}
