import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'

function MainBanner() {
	return (
		<S.Wrapper>
			<S.SlideList>
				<li>
					<p>네모난 고양이</p>
					<h2>네고마켓 서비스 OPEN</h2>
					<p>인기 브랜드 총 집합, 내옷나눔</p>
				</li>
			</S.SlideList>
			<S.ButtonBox>
				<button>&lt;</button>
				<button>&gt;</button>
			</S.ButtonBox>
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
`

const SlideList = styled.ul`
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
		/* background: red; */

		& > * {
			/* background: blue; */
		}
		& > h2 {
			font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
			margin: 1rem 0 2rem;
		}
	}
`

const ButtonBox = styled.div`
	position: absolute;
	top: 0;
	right: 0;

	& > button {
		cursor: pointer;
		width: 4.8rem;
		height: 4.8rem;
		border: none;
		background: ${({ theme }) => theme.COLOR.common.gray[300]};
	}
`

const S = {
	Wrapper,
	SlideList,
	ButtonBox,
}
