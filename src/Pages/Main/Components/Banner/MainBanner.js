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
	// Utils 함수가 많아질 경우, 스타일 컴포넌트의 S처럼 U로 관리
	// productsMock : 만들어야되는 배너
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
				{productsMock.slice(0, 4).map((bnr, idx) => {
					return (
						<li key={idx}>
							<p>네모난 고양이</p>
							<h2>{bnr.title}</h2>
							<p>인기 브랜드 총 집합, 내옷나눔</p>
						</li>
					)
				})}
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
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		padding: 6rem;

		& > h2 {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			margin: 1rem 0 2rem;
		}
	}
`

const S = {
	Wrapper,
	SlideList,
}
