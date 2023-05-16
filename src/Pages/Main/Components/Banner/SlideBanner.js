import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
} from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import Pagination from './Components/Pagination'
import { slide } from '../../../../Utils/slide'

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
					<S.SlideItems>
						<div>
							<h2>지금 아니면 언제사?</h2>
							<p>가득 들어갑니다. 첫 거래 POINT 완충</p>
						</div>
						<S.DesignContainer>
							<div></div>
							<div></div>
						</S.DesignContainer>
					</S.SlideItems>
				</S.SlideBox>
				<Pagination currentIdx={currentIdx} />
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

	& > div:first-of-type {
		position: relative;
		margin-left: 6rem;
		z-index: 3;
	}

	& > :first-of-type > p {
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const DesignContainer = styled.div`
	position: absolute;
	z-index: 1;
	top: 0;
	right: 0;
	${FlexCenterCSS}
	height: 100%;

	& > div {
		width: 13.8rem;
		height: 100%;
		background: ${({ theme }) => theme.COLOR.common.gray[100]};
	}

	& > div:first-of-type {
		background: ${({ theme }) => theme.COLOR.main};
	}
`

const S = {
	Wrapper,
	SlideList,
	SlideBox,
	DesignContainer,
	SlideItems,
}
