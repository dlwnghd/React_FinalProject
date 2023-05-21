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
import RecentBanner from './Components/Banner/RecentBanner'
import ProductApi from '../../Apis/productApi'
import { useQuery } from '@tanstack/react-query'
import QUERY_KEY from '../../Consts/query.key'

function Main() {
	const navigate = useNavigate()

	const getMainPageData = async () => {
		const res = await ProductApi.confirm()
		return res.data
	}

	const {
		data: mainProduct,
		error,
		status,
		isLoading,
	} = useQuery([QUERY_KEY.GET_MAINPAGE_MAIN_DATA], () => getMainPageData(), {})

	if (isLoading && status === 'loading') return
	if (error) return

	return (
		<S.Wrapper>
			<MainBanner mainProduct={mainProduct} />
			<S.Container>
				<RecentBanner mainProduct={mainProduct} />
				<S.FreeMarketList>
					<S.Title>FREE MARKET</S.Title>
					<S.ProductList>
						{mainProduct.freeProduct.map((item, idx) => {
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
				</S.FreeMarketList>
				<SlideBanner mainProduct={mainProduct} />
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
	column-gap: 2rem;
	row-gap: 6rem;

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
