import styled from 'styled-components'
import ItemBox from '../../../Components/ItemBox/ItemBox'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'

function SoldOutList({ soldOutList }) {
	return (
		<S.SoldOutListWrapper>
			<h3>최근 거래 종료 품목</h3>
			<S.SoldOutListContainer>
				{soldOutList &&
					soldOutList.prod_idx.products.product.map((item, idx) => {
						return (
							<ItemBox
								title={item.title}
								price={item.price}
								posterPath={item.img_url}
								isLiked={item.liked}
								createdAt={item.createdAt}
								key={idx}
								status={item.status}
								// onClick={() => navigate(`/detail/${item.idx}`)}
							/>
						)
					})}
			</S.SoldOutListContainer>
		</S.SoldOutListWrapper>
	)
}
export default SoldOutList

const SoldOutListWrapper = styled.div``
const SoldOutListContainer = styled.div`
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
	SoldOutListWrapper,
	SoldOutListContainer,
}
