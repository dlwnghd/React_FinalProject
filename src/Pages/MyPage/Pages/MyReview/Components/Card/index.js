import styled from 'styled-components'
import ProductSection from './Components/Product/ProductSection'
import ReviewSection from './Components/Review/ReviewSection'

function ReviewCard({ review }) {
	const { Product, Review, created_at, idx } = review

	return (
		<S.Wrapper>
			<ProductSection product={Product} date={created_at} />
			<ReviewSection idx={idx} review={Review ?? {}} />
		</S.Wrapper>
	)
}
export default ReviewCard

const Wrapper = styled.div`
	width: 100%;
	height: 58rem;
	box-shadow: 0 4px 10px rgba(48, 52, 65, 0.2);
`

const S = { Wrapper }
