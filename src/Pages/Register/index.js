import styled from 'styled-components'
import Images from './Components/Images'
import { WidthAutoCSS } from '../../Styles/common'
import { useEffect, useState } from 'react'
import Inputs from './Components/Inputs'
import { useParams } from 'react-router-dom'
// import ProductApi from '../../Apis/productApi'

function Register() {
	const [imageList, setImageList] = useState([])
	// const [detailData, setDetailData] = useState('')

	const { prod_idx } = useParams()

	// try {
	// 	const res = ProductApi.detail({ prod_idx })
	// 	setDetailData(res.data)
	// 	console.log({ res })
	// 	console.log({ prod_idx })
	// } catch (err) {}

	useEffect(() => {
		if (!prod_idx) return
	}, [])
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
