import styled from 'styled-components'
import LoadingSkeleton from '../../../../../../../../Components/Skeleton/Skeleton'
import { FlexBetweenCSS } from '../../../../../../../../Styles/common'

function ReviewCardLoading() {
	return (
		<S.Wrapper>
			<S.ProductSection>
				<LoadingSkeleton width={'47%'} height={'100%'} />
				<S.ContentSection>
					<LoadingSkeleton
						width={'18rem'}
						height={'3rem'}
						style={{ marginBottom: '1rem' }}
					/>
					<LoadingSkeleton
						width={'10rem'}
						height={'3rem'}
						style={{ marginBottom: '2rem' }}
					/>
					<LoadingSkeleton width={'18rem'} height={'3rem'} />
				</S.ContentSection>
			</S.ProductSection>
			<S.ReviewSection>
				<LoadingSkeleton width={'100%'} height={'100%'} />
			</S.ReviewSection>
		</S.Wrapper>
	)
}
export default ReviewCardLoading

const Wrapper = styled.div`
	${FlexBetweenCSS}
	flex-direction: column;
	width: 100%;
	height: 58rem;
`

const ProductSection = styled.section`
	width: 100%;
	height: 40%;
	padding: 3rem;
	${FlexBetweenCSS}
`

const ContentSection = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const ReviewSection = styled.section`
	width: 100%;
	height: 60%;
`

const S = { Wrapper, ProductSection, ContentSection, ReviewSection }
