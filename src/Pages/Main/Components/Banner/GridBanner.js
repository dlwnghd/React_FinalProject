import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'

function GridBanner() {
	return (
		<S.Wrapper>
			<S.Title>최근 등록 상품</S.Title>
			<S.SlideContainer>
				<S.SlideList>
					<S.SlideBox>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</S.SlideBox>
					<S.SlideBox>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</S.SlideBox>
				</S.SlideList>
				<S.ButtonBox>
					<button className="prev">&lt;</button>
					<button className="next">&gt;</button>
				</S.ButtonBox>
			</S.SlideContainer>
		</S.Wrapper>
	)
}

export default GridBanner

const Wrapper = styled.section`
	overflow: hidden;
`

const Title = styled.h4`
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
`

const SlideBox = styled.ul`
	${GridCenterCSS}
	${ColumnNumberCSS(6)}
    box-sizing: border-box;
	& > li {
		width: 17.4rem;
		height: 17.4rem;
		background: ${({ theme }) => theme.COLOR.common.gray[100]};
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(3)}
	}
`

const ButtonBox = styled.div`
	& > button {
		position: absolute;
		cursor: pointer;
		top: 50%;
		transform: translateY(-50%);
		width: 3rem;
		height: 6rem;
		border: none;
		box-sizing: border-box;
		background: ${({ theme }) => theme.COLOR.common.gray[300]};
	}

	& > .prev {
		left: 0;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	& > .next {
		right: 0;
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
	}
`

const S = {
	Wrapper,
	Title,
	SlideContainer,
	SlideList,
	SlideBox,
	ButtonBox,
}
