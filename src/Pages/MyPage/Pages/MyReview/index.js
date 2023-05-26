import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'

function MyReview() {
	return (
		<S.Wrapper>
			<p>리뷰 페이지입니다</p>
		</S.Wrapper>
	)
}
export default MyReview

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const S = { Wrapper }
