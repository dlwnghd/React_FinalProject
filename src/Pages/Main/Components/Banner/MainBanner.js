import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import Pagination from './Components/Pagination'
import { slide } from '../../../../Utils/slide'

function MainBanner() {
	const {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		slider,
		currentIdx,
	} = slide(productsMock.slice(0, 4))

	return (
		<S.Wrapper>
			<S.SlideList
				ref={slider}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
			>
				<li>
					<div>
						<p>
							오늘은 내가 협상의 달인<em>!</em>
						</p>
						<h2>네고마켓 서비스 OPEN</h2>
					</div>
					<span>일요일은 내가 협상의 요리사</span>
				</li>
				<li>
					<div>
						<p>
							오늘은 내가 협상의 달인<em>!</em>
						</p>
						<h2>네고마켓 서비스 OPEN</h2>
					</div>
					<span>일요일은 내가 협상의 요리사</span>
				</li>
				<li>
					<div>
						<p>
							오늘은 내가 협상의 달인<em>!</em>
						</p>
						<h2>네고마켓 서비스 OPEN</h2>
					</div>
					<span>일요일은 내가 협상의 요리사</span>
				</li>
				<li>
					<div>
						<p>
							오늘은 내가 협상의 달인<em>!</em>
						</p>
						<h2>네고마켓 서비스 OPEN</h2>
					</div>
					<span>일요일은 내가 협상의 요리사</span>
				</li>
			</S.SlideList>
			<Pagination currentIdx={currentIdx} />
		</S.Wrapper>
	)
}

export default MainBanner

const Wrapper = styled.section`
	position: relative;
	height: 36rem;
	overflow: hidden;
	box-sizing: border-box;
	border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[100]};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		height: 55rem;
	}
`

const SlideList = styled.ul`
	transition: 0.5s ease-in-out;
	${FlexAlignCSS}
	height: 100%;

	& > li {
		position: relative;
		background: ${({ theme }) => theme.COLOR.common.black};
		color: ${({ theme }) => theme.COLOR.common.white};
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		padding: 6rem;

		// 심볼 로고
		&::before {
			position: absolute;
			top: 2rem;
			left: 2rem;
			z-index: 1;
			content: '';
			width: 4rem;
			height: 4rem;
		}

		&:first-of-type::before {
			z-index: 3;
			background: url('/assets/img/nego_symbol_230516_ver1.0_white.svg')
				no-repeat center center;
			background-size: cover;
		}

		// 빼다 이미지
		&::after {
			position: absolute;
			top: 0;
			z-index: 1;
			content: '';
			height: 100%;
		}

		&:first-of-type::after {
			right: 0;
			padding-right: 50%;
			background: url('/assets/img/nego001_banner_230516/Banner_Index01_Layer001_230516_ver.black.svg')
				no-repeat center center;
			background-size: cover;

			@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
				opacity: 0.3;
				padding-right: 100%;
			}
		}

		& > div {
			margin-bottom: 4rem;
			position: relative;
			z-index: 2;
		}

		& > div ~ span {
			position: relative;
			z-index: 2;
		}

		& > div > h2 {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			margin-top: 1rem;
		}

		& > div > p {
			color: ${({ theme }) => theme.COLOR.main};
		}
	}
`

const S = {
	Wrapper,
	SlideList,
}
