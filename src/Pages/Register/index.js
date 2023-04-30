import styled from 'styled-components'
import Images from './Components/Images'
import { WidthAutoCSS } from '../../Styles/common'
import ItemInfo from './Components/ItemInfo'

function Register() {
	return (
		<S.Wrapper>
			<Images />
			<ItemInfo />
		</S.Wrapper>
	)
}

export default Register

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const S = { Wrapper }
