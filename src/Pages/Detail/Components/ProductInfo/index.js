import styled from 'styled-components'
import PrdDescription from './Description/Description'
import PrdThumbnail from './Thumbnail/Thumbnail'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'

function ProductInfo({ product }) {
	const { ProductImages } = product
	console.log(ProductImages)
	return (
		<S.Wrapper>
			<PrdThumbnail productImages={ProductImages} />
			<PrdDescription product={product} />
		</S.Wrapper>
	)
}

export default ProductInfo

const Wrapper = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	width: 100%;
	gap: 2rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(1)}
	}
`

const S = {
	Wrapper,
}
