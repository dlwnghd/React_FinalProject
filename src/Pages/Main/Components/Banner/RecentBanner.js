import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../../Styles/common'
import { Arrow_Icon } from '../../../../Components/Icons/Icons'
import { useNavigate } from 'react-router-dom'
import { slide } from '../../../../Hooks/useSlide'

function RecentBanner({ mainProduct }) {
	const freeProduct = mainProduct.freeProduct
	const usedProduct = mainProduct.usedProduct

	// 최근 등록상품 리스트
	const recentProduct = usedProduct.concat(freeProduct)
	const recentFilter = [...recentProduct]
	recentFilter.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

	const {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		slider,
		nextSlide,
		prevSlide,
	} = slide(recentFilter.slice(0, 4))

	const navigate = useNavigate()

	return (
		<S.Wrapper>
			<S.Title>최근 등록 상품</S.Title>
			<S.SlideContainer>
				<S.SlideList
					ref={slider}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
				>
					{recentFilter.slice(0, 4).map((item, idx) => {
						return (
							<S.SlideBox key={idx}>
								{recentFilter.slice(1, 7).map((item, idx) => {
									return (
										<S.SlideItem
											key={idx}
											recentIMG={`${item.img_url}`}
											onClick={() => navigate(`/detail/${item.idx}`)}
										></S.SlideItem>
									)
								})}
							</S.SlideBox>
						)
					})}
				</S.SlideList>
				<S.ButtonBox>
					<button className="prev" onClick={prevSlide}>
						<Arrow_Icon size="15" color="white" />
					</button>
					<button className="next" onClick={nextSlide}>
						<Arrow_Icon size="15" color="white" />
					</button>
				</S.ButtonBox>
			</S.SlideContainer>
		</S.Wrapper>
	)
}

export default RecentBanner

const Wrapper = styled.section`
	overflow: hidden;
`

const Title = styled.h3`
	text-align: center;
`

const SlideContainer = styled.div`
	position: relative;
	margin-top: 4rem;
`

const SlideList = styled.div`
	${GridCenterCSS}
	grid-auto-flow: column;
	grid-auto-columns: 100%;
	transition: 0.5s ease-in-out;
`

const SlideBox = styled.ul`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(6)}
	column-gap: 2rem;

	box-sizing: border-box;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${ColumnNumberCSS(3)}
		column-gap: 1rem;
		row-gap: 1rem;
	}

	& > li {
		width: 100%;
		/* height: 17.4rem; */
	}

	& > li::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const SlideItem = styled.li`
	cursor: pointer;
	background: ${({ recentIMG }) => `url(${recentIMG})`} no-repeat center center;
	background-size: cover;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 100%;
	}
`

const ButtonBox = styled.div`
	& > button {
		position: absolute;
		top: 50%;
		width: 3rem;
		height: 6rem;
		${FlexCenterCSS}
		transform: translateY(-50%);
		border: none;
		box-sizing: border-box;
		background: ${({ theme }) => theme.COLOR.main};
		cursor: pointer;
	}

	& > .prev {
		left: 0;
		/* border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem; */

		& > svg {
			transform: rotate(180deg);
		}
	}

	& > .next {
		right: 0;
		/* border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem; */
	}
`

const S = {
	Wrapper,
	Title,
	SlideContainer,
	SlideList,
	SlideBox,
	SlideItem,
	ButtonBox,
}
