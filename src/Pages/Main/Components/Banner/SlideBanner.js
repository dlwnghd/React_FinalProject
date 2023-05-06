import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
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
					{productsMock.slice(0, 4).map((item, idx) => {
						return <S.SlideItems key={idx}></S.SlideItems>
					})}
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
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	background: ${({ theme }) => theme.COLOR.common.gray[300]};
`

const S = {
	Wrapper,
	SlideList,
	SlideBox,
	SlideItems,
}
