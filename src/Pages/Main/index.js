import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import SlideBanner from './Components/Banner/SlideBanner'
import MainBanner from './Components/Banner/MainBanner'
import ItemBox from '../../Components/ItemBox/ItemBox'
import { useNavigate } from 'react-router-dom'
import useGetMainPageMainData from '../../Hooks/Queries/get-mainPage'
import RecentBanner from './Components/Banner/RecentBanner'

function Main() {
	const navigate = useNavigate()

	const {
		data: mainProduct,
		error,
		status,
		isLoading,
	} = useGetMainPageMainData()

	// freeProduct : 무료나눔
	// usedProduct : 중고거래
	return (
		!isLoading &&
		status === 'success' && (
			<S.Wrapper>
				<MainBanner />
				<S.Container>
					<RecentBanner mainProduct={mainProduct} />
					<S.FreeMarketList>
						<S.Title>FREE MARKET</S.Title>
						<S.ProductList>
							{/* usedProduct -> freeProduct로 변경 예정 */}
							{mainProduct.usedProduct.map((item, idx) => {
								return (
									<ItemBox
										title={item.title}
										price={item.price}
										posterPath={item.img_url}
										context={item.script}
										isLiked={item.liked}
										key={idx}
										onClick={() => navigate(`/detail/${item.idx}`)}
										// hover 되었을 경우, 투명도 있는 검정 바탕 위에 하트 표시하는 것으로 변경 예정
									/>
								)
							})}
						</S.ProductList>
					</S.FreeMarketList>
					<SlideBanner />
					<S.TradeUsedList>
						<S.Title>TRADE USED</S.Title>
						<S.ProductList>
							{mainProduct.usedProduct.map((item, idx) => {
								return (
									<ItemBox
										title={item.title}
										price={item.price}
										posterPath={item.img_url}
										context={item.script}
										isLiked={item.liked}
										key={idx}
										onClick={() => navigate(`/detail/${item.idx}`)}
									/>
								)
							})}
						</S.ProductList>
					</S.TradeUsedList>
				</S.Container>
			</S.Wrapper>
		)
	)
}

export default Main

const Wrapper = styled.section`
	${WidthAutoCSS}

	@media screen and (max-width:${({ theme }) => theme.MEDIA.mobile}) {
		width: 100%;
	}
`

const Container = styled.section`
	margin: 12rem 0;
`

const FreeMarketList = styled.section`
	margin: 12rem 0;
`

const TradeUsedList = styled.section`
	margin: 12rem 0;
`

const Title = styled.h3`
	text-align: center;
`

const ProductList = styled.div`
	width: 100%;
	margin-top: 4rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const S = {
	Wrapper,
	Container,
	FreeMarketList,
	TradeUsedList,
	Title,
	ProductList,
}
