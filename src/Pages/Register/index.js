import styled from 'styled-components'
import Images from './Components/Images'
import { FlexCenterCSS, WidthAutoCSS } from '../../Styles/common'
import ItemInfo from './Components/ItemInfo'
import Map from './Components/Map'
import Button from '../../Components/Button/Button'

function Register() {
	return (
		<S.Wrapper>
			<Images />
			<ItemInfo />
			<Map />
			<S.ButtonWrap>
				<Button style={{ margin: '4rem' }}>등록 완료</Button>
				<Button style={{ margin: '4rem' }}>취소</Button>
			</S.ButtonWrap>
		</S.Wrapper>
	)
}

export default Register

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const ButtonWrap = styled.div`
	${FlexCenterCSS}
`

const S = { Wrapper, ButtonWrap }
