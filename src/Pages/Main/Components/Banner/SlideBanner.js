import styled from 'styled-components'
import { FlexAlignCSS, FlexBetweenCSS } from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import Pagination from './Components/Pagination'
import { slide } from '../../../../Hooks/useSlide'

const bannerList = [
	{
		title: '지금 아니면 언제사?',
		subTitle: '가득 들어갑니다. 첫 거래 POINT 완충',
		img_url: '',
	},
	{
		title: 'FREE MARKET',
		subTitle: '역대급! 고대하던 네모난 고양이의 나눔',
		img_url: '',
	},
	{
		title: 'TRADE USED',
		subTitle: '내께 너한테 가서 새로워진다!',
		img_url: '',
	},
	{
		title: '지금 사면 냥이득',
		subTitle: '최근 3개월 전보다 50% 떨어진 건 처음이야!',
		img_url: '',
	},
]

function SlideBanner() {
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
			<S.SlideList>
				<S.SlideBox
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					ref={slider}
				>
					{bannerList.map((bnr, idx) => {
						return (
							<S.SlideItems key={idx}>
								<div>
									<h2>{bnr.title}</h2>
									<p>{bnr.subTitle}</p>
								</div>
							</S.SlideItems>
						)
					})}
				</S.SlideBox>
				<Pagination bannerList={bannerList} currentIdx={currentIdx} />
			</S.SlideList>
		</S.Wrapper>
	)
}

export default SlideBanner

const Wrapper = styled.section`
	margin: 12rem 0;
	width: 100%;
	overflow: hidden;
`

const SlideList = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
	${FlexAlignCSS}
`

const SlideBox = styled.ul`
	${FlexAlignCSS}
	width:100%;
	height: 17.4rem;
	transition: 0.5s ease-in-out;
`

const SlideItems = styled.li`
	position: relative;
	flex-shrink: 0;
	${FlexBetweenCSS}
	width: 100%;
	height: 100%;
	background: ${({ theme }) => theme.COLOR.common.black};
	color: ${({ theme }) => theme.COLOR.common.white};

	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	& > div:first-of-type {
		position: relative;
		margin-left: 6rem;
		z-index: 3;
	}

	& > :first-of-type > p {
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const S = {
	Wrapper,
	SlideList,
	SlideBox,
	SlideItems,
}
