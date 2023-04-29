import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'

function ProductList({ productList }) {


	return (
		<S.Items>
			{productList.map(item => (
				<S.Item>
					<ImageContainer>
						<img src={item.thumbnail} width={'inherit'}/>
						<button>test</button>
					</ImageContainer>
					<S.ProductInfo>
						<S.ProductTitle>{item.title}</S.ProductTitle>
						<S.ProductContent>{item.content}</S.ProductContent>
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

	@media screen and (max-width: 440px) {
		& > img {
            width: 100%;
        }
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
