import styled from 'styled-components'
import Images from './Components/Images'
import { WidthAutoCSS } from '../../Styles/common'
import ItemInfo from './Components/ItemInfo'
import Map from './Components/Map'

function Register() {
	return (
		<S.Wrapper>
			<Images />
			<ItemInfo />
			<Map />
		</S.Wrapper>
	)
}

export default Register

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const S = { Wrapper }
