import * as S from './style'

function AmountTotalBox({ price }) {
	const totalPriceItem = [
		{
			title: '총 판매 금액',
			price: price.sale,
		},
		{
			title: '총 구매 금액',
			price: price.purchase,
		},
		{
			title: '합계',
			price: price.difference,
		},
	]

	return (
		<S.Wrapper state={'last'}>
			<S.Container>
				{totalPriceItem.map(item => (
					<S.TitleContainer>
						<S.Title>{item.title}</S.Title>
						<S.PriceText size={'tiny'}>
							{parseInt(item.price).toLocaleString()}
						</S.PriceText>
					</S.TitleContainer>
				))}
			</S.Container>
		</S.Wrapper>
	)
}
export default AmountTotalBox
