import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { isNavigationAtom } from '../../../../Atoms/Navigation.atom'
import {
	Chatting_Icon,
	FreeMarket_Icon,
	Home_Icon,
	MyPage_Icon,
	TradeUsed_Icon,
} from '../../../Icons/Icons'

function MobileFooter() {
	const navigate = useNavigate()
	const [footerSelect, setFooterSelect] = useRecoilState(isNavigationAtom)

	return (
		<S.NavigationWrapper>
			<S.Navigation className="navigation">
				<S.NavigationUl>
					<S.NavigationUlLi
						className={`list ${footerSelect === 1 ? 'active' : ''}`}
						onClick={() => {
							navigate('/')
							setFooterSelect(1)
						}}
					>
						<div>
							<span className="icon">
								<Home_Icon />
							</span>
							<span className="text">홈</span>
						</div>
					</S.NavigationUlLi>
					<S.NavigationUlLi
						className={`list ${footerSelect === 2 ? 'active' : ''}`}
						onClick={() => {
							navigate('/list/무료나눔리스트')
							setFooterSelect(2)
						}}
					>
						<div>
							<span className="icon">
								<FreeMarket_Icon />
							</span>
							<span className="text">무료</span>
						</div>
					</S.NavigationUlLi>
					<S.NavigationUlLi
						className={`list ${footerSelect === 3 ? 'active' : ''}`}
						onClick={() => {
							navigate('/list/중고거래리스트')
							setFooterSelect(3)
						}}
					>
						<div>
							<span className="icon">
								<TradeUsed_Icon />
							</span>
							<span className="text">네고</span>
						</div>
					</S.NavigationUlLi>
					<S.NavigationUlLi
						className={`list ${footerSelect === 4 ? 'active' : ''}`}
						onClick={() => {
							navigate('/chat인데 modal로 띄우기로 해서 흠')
							setFooterSelect(4)
						}}
					>
						<div>
							<span className="icon">
								<Chatting_Icon />
							</span>
							<span className="text">채팅</span>
						</div>
					</S.NavigationUlLi>
					<S.NavigationUlLi
						className={`list ${footerSelect === 5 ? 'active' : ''}`}
						onClick={() => {
							navigate('/mypage-bank')
							setFooterSelect(5)
						}}
					>
						<div>
							<span className="icon">
								<MyPage_Icon />
							</span>
							<span className="text">내 정보</span>
						</div>
					</S.NavigationUlLi>
					<S.Indicator className="indicator" />
				</S.NavigationUl>
			</S.Navigation>
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

	@media screen and (max-width: 440px) {
		display: block;
	}
`

const Navigation = styled.div`
	position: relative;
	width: 400px;
	height: 70px;
	background: black;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	margin: auto;
`

const NavigationUl = styled.ul`
	display: flex;
	width: 350px;
`

const NavigationUlLi = styled.li`
	position: relative;
	list-style: none;
	width: 70px;
	height: 70px;
	z-index: 1;

	& > div {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		text-align: center;
		font-weight: 700;
	}

	& > div .icon {
		position: relative;
		display: block;
		line-height: 75px;
		font-size: 3.5rem;
		text-align: center;
		transition: 0.5s;
		color: white;
	}

	&.active > div .icon {
		transform: translateY(-32px);
		color: black;
	}

	& > div .text {
		position: absolute;
		color: #fff;
		font-weight: 400;
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

	&:nth-child(1).active ~ .indicator {
		transform: translateX(calc(70px * 0));
	}
	&:nth-child(2).active ~ .indicator {
		transform: translateX(calc(70px * 1));
	}
	&:nth-child(3).active ~ .indicator {
		transform: translateX(calc(70px * 2));
	}
	&:nth-child(4).active ~ .indicator {
		transform: translateX(calc(70px * 3));
	}
	&:nth-child(5).active ~ .indicator {
		transform: translateX(calc(70px * 4));
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
	Navigation,
	NavigationUl,
	NavigationUlLi,
	Indicator,
}
