import styled from 'styled-components'
import LoadingSkeleton from '../../../../Components/Skeleton/Skeleton'
import { useLocation } from 'react-router-dom'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'

function MainSkeleton() {
	const location = useLocation()
	const validLocation = location?.pathname.split('/')[1]

	return (
		<>
			<LoadingSkeleton height={'36rem'} marginBottSom={'8rem'} />
			<S.Wrapper>
				<S.Title alignDetail={validLocation}>
					<h3>최근 상품 보러가기</h3>
					<span>오늘 새롭게 등록된 상품을 보러오세요</span>
				</S.Title>
				<S.SkeletonContainer>
					{productsMock.slice(0, 5).map((it, idx) => {
						return <LoadingSkeleton width={'100%'} height={'auto'} key={idx} />
					})}
				</S.SkeletonContainer>
			</S.Wrapper>
		</>
	)
}

export default MainSkeleton

const Wrapper = styled.section`
	overflow: hidden;
	margin: 12rem 0;
`

const Title = styled.div`
	text-align: ${({ alignDetail }) =>
		alignDetail === 'detail' ? 'left' : 'center'};

	margin-bottom: ${({ alignDetail }) =>
		alignDetail === 'detail' ? '1rem' : '3rem'};
	margin-bottom: 3rem;

	& > h3 {
		margin-bottom: 1rem;
	}
`

const SkeletonContainer = styled.div`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(5)}

	& > span::before {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const S = {
	Wrapper,
	Title,
	SkeletonContainer,
}
