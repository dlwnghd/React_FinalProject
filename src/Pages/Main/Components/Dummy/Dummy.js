import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import ItemBox from '../../../../Components/ItemBox/ItemBox'
import SlideBanner from '../Banner/SlideBanner'

function DummyList({ mainProduct }) {
	return (
		<S.Container>
			<S.FreeMarketList>
				<S.Title>
					<h3>Free Market</h3>
					<span>네고와 함께하는 무료나눔</span>
				</S.Title>
				<S.ProductList>
					<>
						{productsMock.slice(0, 8).map((item, idx) => {
							return (
								<ItemBox
									key={idx}
									prod_idx={item.idx}
									title={item.title}
									description={item.description}
									price={item.price}
									posterPath={item.img_url}
									createdAt={item.createdAt}
									isLiked={item.liked}
									status={item.status}
									productsTags={item.ProductsTags}
								/>
							)
						})}
					</>
				</S.ProductList>
			</S.FreeMarketList>
			<SlideBanner mainProduct={mainProduct} />
			<S.TradeUsedList>
				<S.Title>
					<h3>Trade Used</h3>
					<span>네고와 함께하는 중고거래</span>
				</S.Title>
				<S.ProductList>
					<>
						{productsMock.slice(0, 8).map((item, idx) => {
							return (
								<ItemBox
									key={idx}
									prod_idx={item.idx}
									title={item.title}
									description={item.description}
									price={item.price}
									posterPath={item.img_url}
									createdAt={item.createdAt}
									isLiked={item.liked}
									status={item.status}
									productsTags={item.ProductsTags}
								/>
							)
						})}
					</>
				</S.ProductList>
			</S.TradeUsedList>
		</S.Container>
	)
}

export default DummyList

const Container = styled.section`
	margin: 12rem 0;
`

const FreeMarketList = styled.section`
	margin: 12rem 0;
`

const TradeUsedList = styled.section`
	margin: 12rem 0;
`

const Title = styled.div`
	text-align: center;
	margin-bottom: 4rem;

	& > h3 {
		margin-bottom: 1rem;
	}
`

const ProductList = styled.div`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};
	column-gap: 2rem;
	row-gap: 6rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${WidthAutoCSS}
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`

const S = {
	Container,
	FreeMarketList,
	TradeUsedList,
	Title,
	ProductList,
}
