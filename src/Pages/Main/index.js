import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import productsMock from '../../__mock__/Data/Product/product.data'
import SlideBanner from './Components/Banner/SlideBanner'
import MainBanner from './Components/Banner/MainBanner'
import GridBanner from './Components/Banner/RecentBanner'
import ItemBox from '../../Components/ItemBox/ItemBox'

function Main() {
	return (
		<S.Wrapper>
			<MainBanner />
			<S.Container>
				<GridBanner />
				<S.FreeMarketList>
					<S.Title>FREE MARKET</S.Title>
					<S.ProductList>
						{productsMock.slice(0, 8).map((item, idx) => {
							return (
								<ItemBox
									title={item.title}
									price={item.price}
									posterPath={item.image_url}
									context={item.script}
									isLiked={item.liked}
									key={idx}
								/>
							)
						})}
					</S.ProductList>
				</S.FreeMarketList>
				<SlideBanner />
				<S.TradeUsedList>
					<S.Title>TRADE USED</S.Title>
					<S.ProductList>
						{productsMock.slice(0, 8).map((item, idx) => {
							return (
								<ItemBox
									title={item.title}
									price={item.price}
									posterPath={item.image_url}
									context={item.script}
									isLiked={item.liked}
									key={idx}
								/>
							)
						})}
					</S.ProductList>
				</S.TradeUsedList>
			</S.Container>
		</S.Wrapper>
	)
}

export default Main

const Wrapper = styled.section`
	${WidthAutoCSS}
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
