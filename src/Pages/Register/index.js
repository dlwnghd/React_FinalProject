import styled from 'styled-components'
import Images from './Components/Images'
import { WidthAutoCSS } from '../../Styles/common'
import { useState } from 'react'
import Inputs from './Components/Inputs'

function Register() {
	const [imageList, setImageList] = useState([])
	return (
		<S.Wrapper>
			<Images imageList={imageList} setImageList={setImageList} />
			<Inputs imageList={imageList} />
		</S.Wrapper>
	)
}

export default Register

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const S = { Wrapper }
