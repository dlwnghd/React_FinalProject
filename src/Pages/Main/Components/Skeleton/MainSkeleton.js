import styled from 'styled-components'
import LoadingSkeleton from '../../../../Components/Skeleton/Skeleton'
import { useLocation } from 'react-router-dom'
import {
	ColumnNumberCSS,
	FlexBetweenCSS,
	GridCenterCSS,
} from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'

function MainSkeleton() {
	const location = useLocation()
	const validLocation = location?.pathname.split('/')[1]

	return (
		<>
			<LoadingSkeleton height={'36rem'} marginBottom={'8rem'} />
			<S.Wrapper>
				<S.Title alignDetail={validLocation}>
					<h3>최근 상품 보러가기</h3>
					<span>오늘 새롭게 등록된 상품을 보러오세요</span>
				</S.Title>
				<S.SkeletonContainer mode={'recent'}>
					{productsMock.slice(0, 6).map((it, idx) => {
						return <LoadingSkeleton width={'100%'} height={'auto'} key={idx} />
					})}
				</S.SkeletonContainer>

				<S.FreeMarketList>
					<S.Title>
						<h3>Free Market</h3>
						<span>네고와 함께하는 무료나눔</span>
					</S.Title>

					<S.SkeletonContainer>
						{productsMock.slice(0, 8).map((it, idx) => {
							return (
								<div>
									<LoadingSkeleton width={'100%'} height={'auto'} key={idx} />
									<div>
										<LoadingSkeleton
											width={'12rem'}
											height={'2rem'}
											key={idx}
										/>
										<div>
											<LoadingSkeleton
												width={'6rem'}
												height={'2rem'}
												key={idx}
											/>
											<LoadingSkeleton
												width={'6rem'}
												height={'2rem'}
												key={idx}
											/>
										</div>
									</div>
								</div>
							)
						})}
					</S.SkeletonContainer>
				</S.FreeMarketList>
				<LoadingSkeleton height={'17.4rem'} marginBottom={'8rem'} />
				<S.TradeUsedList>
					<S.Title>
						<h3>Trade Used</h3>
						<span>네고와 함께하는 중고거래</span>
					</S.Title>

					<S.SkeletonContainer>
						{productsMock.slice(0, 8).map((it, idx) => {
							return (
								<div>
									<LoadingSkeleton width={'100%'} height={'auto'} key={idx} />
									<div>
										<LoadingSkeleton
											width={'12rem'}
											height={'2rem'}
											key={idx}
										/>
										<div>
											<LoadingSkeleton
												width={'6rem'}
												height={'2rem'}
												key={idx}
											/>
											<LoadingSkeleton
												width={'6rem'}
												height={'2rem'}
												key={idx}
											/>
										</div>
									</div>
								</div>
							)
						})}
					</S.SkeletonContainer>
				</S.TradeUsedList>
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
	${({ mode }) => (mode === 'recent' ? ColumnNumberCSS(6) : ColumnNumberCSS(4))}

    & > span::before {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	& > div {
		width: 100%;
	}

	& > div > div > div {
		${FlexBetweenCSS}
	}

	& > div > span {
		margin-bottom: 2rem;
	}

	& > div > span::before {
		content: '';
		display: block;
		padding-bottom: 100%;
	}

	& > div > div > span {
		margin-bottom: 1rem;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${({ mode }) =>
			mode === 'recent' ? ColumnNumberCSS(3) : ColumnNumberCSS(2)}
	}
`

const FreeMarketList = styled.section`
	margin: 12rem 0;
`

const TradeUsedList = styled.section`
	margin: 12rem 0;
`

const S = {
	Wrapper,
	Title,
	SkeletonContainer,
	FreeMarketList,
	TradeUsedList,
}
