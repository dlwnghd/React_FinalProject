import styled from 'styled-components'
import Images from './Components/Images'
import { WidthAutoCSS } from '../../Styles/common'
import { useEffect, useState } from 'react'
import Inputs from './Components/Inputs'
import { useParams } from 'react-router-dom'
import ProductApi from '../../Apis/productApi'
import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'

function Register() {
	const [imageList, setImageList] = useState([])
	const [imageFileArr, setImageFileArr] = useState([])
	const [imgNum, setImgNum] = useState(false)
	let imageFileArrTest = []

	const { prod_idx } = useParams()

	const getProductDetailData = async () => {
		const res = await ProductApi.detail({ prod_idx })
		return res.data
	}

	const useGetProductDetailData = () => {
		const { data, refetch } = useQuery(
			[QUERY_KEY.GET_PRODUCT_DETAIL_DATA, prod_idx],
			() => getProductDetailData(),
			{
				enabled: !!prod_idx,
			},
		)
		return { data, refetch }
	}

	const { data: DetailData, refetch } = useGetProductDetailData()

	useEffect(() => {
		refetch()
	}, [prod_idx])

	return (
		<S.Wrapper>
			<Images
				setImageList={setImageList}
				imageList={imageList}
				DetailData={DetailData}
				setImageFileArr={setImageFileArr}
				imageFileArr={imageFileArr}
				imgNum={imgNum}
				setImgNum={setImgNum}
				imageFileArrTest={imageFileArrTest}
			/>
			<Inputs
				DetailData={DetailData}
				setImgNum={setImgNum}
				imageFileArr={imageFileArr}
				imageList={imageList}
			/>
		</S.Wrapper>
	)
}

export default Register

const Wrapper = styled.div`
	${WidthAutoCSS}
`

const S = { Wrapper }
