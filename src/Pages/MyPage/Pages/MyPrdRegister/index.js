import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import MyPageNav from '../../Components/Navigation/Navigation'

function MyPrdRegister() {
	return (
		<S.Wrapper>
			<MyPageNav type={'myPage'} />
		</S.Wrapper>
	)
}

export default MyPrdRegister

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const S = { Wrapper }
