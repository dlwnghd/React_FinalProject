import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import productsMock from '../../../__mock__/Data/Product/product.data'

function ProductList() {
	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get('/api/products')
				console.log(data)
			} catch (err) {
				console.log(err)
			}
		}
		getData()
	}, [])
	return (
		<S.Items>
			{productsMock.map(item => (
				<S.Item>
					<ImageContainer>
						<img src={item.image_url} width={'inherit'} />
					</ImageContainer>
					<S.ProductInfo>
						<S.ProductTitle>{item.title}</S.ProductTitle>
						<S.ProductContent>
							글의 내용이 무언가 있을겁니다 분명히 ㅎㅎ;;
						</S.ProductContent>
						<S.ProductPrice>
							{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</S.ProductPrice>
					</S.ProductInfo>
				</S.Item>
			))}
		</S.Items>
	)
}

export default ProductList

const Items = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(3)}
	row-gap: 2rem;

	@media screen and (max-width: 440px) {
		${ColumnNumberCSS(2)}
	}
`
const Item = styled.div`
	width: 27.5rem;
	cursor: pointer;

	@media screen and (max-width: 440px) {
		width: 15rem;
	}
`

const ImageContainer = styled.div`
	position: relative;

	& > img {
		width: 100%;
	}

	& > button {
		position: absolute;
		top: 0;
		right: 0;
	}
`

const ProductInfo = styled.div`
	width: 100%;
`

const ProductTitle = styled.p`
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	margin: 1rem 0;
`
const ProductContent = styled.p`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 2rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.light};
	color: ${({ theme }) => theme.COLOR.common.gray[200]};
`
const ProductPrice = styled.p`
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`

const S = {
	Items,
	Item,
	ImageContainer,
	ProductInfo,
	ProductTitle,
	ProductContent,
	ProductPrice,
}
