import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import RecentBanner from '../../../Main/Components/Banner/RecentBanner'
import useGetMyPageInterestData from '../../../../Hooks/Queries/get-myPageInterest'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetMainPageData from '../../../../Hooks/Queries/get-mainPage'

function Contents() {
	const [page, setPage] = useState(1)
	const navigate = useNavigate()

	const { data: mainProduct, error, status, isLoading } = useGetMainPageData()

	const {
		data: likeData,
		status: likeStatus,
		error: likeError,
		isLoading: likeIsLoading,
	} = useGetMyPageInterestData(page)

	if (status === 'loading') return
	if (isLoading) return
	if (error) return

	console.log(mainProduct)

	const productList = {
		freeProduct: mainProduct.freeProduct,
		usedProduct: mainProduct.usedProduct,
	}

	return (
		<S.PrdListBox>
			<S.RecentPrdList>
				<RecentBanner {...productList} />
			</S.RecentPrdList>
			<S.InterestPrdList>
				<S.InterestTitle>
					<h3>관심 상품 보러가기</h3>
					<span>내게 관심있던 상품을 다시 둘러보세요.</span>
				</S.InterestTitle>
				<S.InterestBox>
					{!likeIsLoading &&
						likeData.LikeList.slice(0, 5).map((item, idx) => {
							return (
								<S.InterestItems
									key={idx}
									interestIMG={item.Product.img_url}
									onClick={() =>
										navigate(`/detail/${item.Product.idx}`, {
											state: item.liked,
										})
									}
								></S.InterestItems>
							)
						})}
				</S.InterestBox>
			</S.InterestPrdList>
		</S.PrdListBox>
	)
}

export default Contents

const PrdListBox = styled.div`
	width: 100%;
	margin: 6rem 0;
	${GridCenterCSS}
	${ColumnNumberCSS(1)}
`
const RecentPrdList = styled.div`
	width: 100%;
	margin-bottom: 6rem;
`
const InterestPrdList = styled.div`
	width: 100%;

	& > h3 {
		margin-bottom: 1rem;
	}
`

const InterestTitle = styled.div`
	margin-bottom: 3rem;
`

const InterestBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(5)}
	column-gap: 2rem;
	box-sizing: border-box;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${ColumnNumberCSS(3)}
		column-gap: 1rem;
		row-gap: 1rem;
	}
`
const InterestItems = styled.div`
	width: 100%;
	cursor: pointer;
	background: ${({ interestIMG }) => `url(${interestIMG})`} no-repeat center
		center;
	background-size: cover;

	&::after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
`

const S = {
	PrdListBox,
	RecentPrdList,
	InterestPrdList,
	InterestTitle,
	InterestBox,
	InterestItems,
}
