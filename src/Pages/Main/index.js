import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import productsMock from '../../__mock__/Data/Product/product.data'
import SlideBanner from './Components/Banner/SlideBanner'
import MainBanner from './Components/Banner/MainBanner'
import GridBanner from './Components/Banner/GridBanner'
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
									context={item.status}
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
									context={item.status}
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
	margin-top: 4rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)}

	@media screen and (max-width:${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
	}
`

const ProductBox = styled.div`
	position: relative;
	cursor: pointer;

	& > div:first-of-type {
		width: 27.6rem;
		height: 27.6rem;
		background: ${({ theme }) => theme.COLOR.common.gray[100]};

		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			width: 100%;
			height: 17.4rem;
		}
	}
	& > div:nth-of-type(2) {
		margin-top: 2rem;

		& > h3 {
			margin: 1rem 0 2rem;
		}
	}
	& > div:last-of-type {
		position: absolute;
		z-index: 3;
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		cursor: pointer;
		padding: 2rem;
		top: 0;
		right: 0;
	}
`

const S = {
	Wrapper,
	Container,
	FreeMarketList,
	TradeUsedList,
	Title,
	ProductList,
	ProductBox,
}
