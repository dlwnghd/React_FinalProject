import styled from 'styled-components'
import Images from './Components/Images'
import { WidthAutoCSS } from '../../Styles/common'
import ItemInfo from './Components/ItemInfo'
import { useState } from 'react'

function Register() {
	const [imageList, setImageList] = useState([])
	return (
		<S.Wrapper>
			<Images imageList={imageList} setImageList={setImageList} />
			<ItemInfo imageList={imageList} />
		</S.Wrapper>
	)
}

export default Register

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const S = { Wrapper }
