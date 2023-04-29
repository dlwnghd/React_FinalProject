import styled from 'styled-components'
import PrdDescription from './Description/Description'
import PrdThumbnail from './Thumbnail/Thumbnail'

function ProductInfo() {
	return (
		<S.Wrapper>
			<PrdThumbnail />
			<PrdDescription />
		</S.Wrapper>
	)
}

export default ProductInfo

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	gap: 2rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
	}
`

const S = {
	Wrapper,
}
