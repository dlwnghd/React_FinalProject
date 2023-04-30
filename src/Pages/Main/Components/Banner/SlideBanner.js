import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexAlignCSS,
	GridCenterCSS,
} from '../../../../Styles/common'

function SlideBanner() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.FirstSlideList>
					<S.ItemBox></S.ItemBox>
					<S.ItemBox></S.ItemBox>
					<S.ItemBox></S.ItemBox>
					<S.ItemBox></S.ItemBox>
				</S.FirstSlideList>
				<S.SecondSlideList>
					<S.ItemBox></S.ItemBox>
					<S.ItemBox></S.ItemBox>
					<S.ItemBox></S.ItemBox>
					<S.ItemBox></S.ItemBox>
				</S.SecondSlideList>
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

	& > ul {
		width: 100%;
		${FlexAlignCSS}
	}
`

const FirstSlideList = styled.ul`
	& > li {
		background: ${({ theme }) => theme.COLOR.common.gray[300]};
	}
`

const SecondSlideList = styled.ul`
	& > li {
		background: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
`

const ItemBox = styled.li`
	flex-shrink: 0;
	width: 100%;
	height: 17.4rem;
`

const S = {
	Wrapper,
	Container,
	FirstSlideList,
	SecondSlideList,
	ItemBox,
}
