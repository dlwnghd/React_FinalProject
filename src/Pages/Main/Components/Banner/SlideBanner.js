import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'

function SlideBanner() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.SlideList>
					<S.FirstSlideBox>
						<S.SlideItems></S.SlideItems>
					</S.FirstSlideBox>
					<S.PaginationBox>
						<S.PaginationItems></S.PaginationItems>
					</S.PaginationBox>
				</S.SlideList>
				<S.SlideList>
					<S.SecondSlideBox>
						<S.SlideItems></S.SlideItems>
					</S.SecondSlideBox>
					<S.PaginationBox>
						<S.PaginationItems></S.PaginationItems>
					</S.PaginationBox>
				</S.SlideList>
			</S.Container>
		</S.Wrapper>
	)
}

export default SlideBanner

const Wrapper = styled.section`
	margin: 12rem 0;
`

const Container = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
    column-gap: 0;
	overflow: hidden;
`

const SlideList = styled.div`
	width: 100%;
	position: relative;
`

const FirstSlideBox = styled.ul`
	& > li {
		background: ${({ theme }) => theme.COLOR.common.gray[300]};
	}
`

const SecondSlideBox = styled.ul`
	& > li {
		background: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
`

const SlideItems = styled.li`
	flex-shrink: 0;
	width: 100%;
	height: 17.4rem;
`

const PaginationBox = styled.div``

const PaginationItems = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 50%;
	transform: translateX(-50%);
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	background: ${({ theme }) => theme.COLOR.common.gray[100]};
`

const S = {
	Wrapper,
	Container,
	SlideList,
	FirstSlideBox,
	SecondSlideBox,
	SlideItems,
	PaginationBox,
	PaginationItems,
}
