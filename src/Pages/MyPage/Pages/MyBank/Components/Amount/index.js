import styled from 'styled-components'
import { ColumnNumberCSS, FlexAlignCSS } from '../../../../../../Styles/common'
import AmountItemBox from './Components/Box/ItemBox'
import AmountTotalBox from './Components/Box/TotalBox'
import LoadingSkeleton from '../../../../../../Components/Skeleton/Skeleton'

function AmountSection({ status, amount }) {
	const totalDifferenceAmount =
		parseInt(amount?.totalSaleAmount || 0) -
		parseInt(amount?.totalPurchaseAmount || 0) // 총 거래 차액

	const totalPrice = {
		sale: amount?.totalSaleAmount || 0,
		purchase: amount?.totalPurchaseAmount || 0,
		difference: totalDifferenceAmount,
	} // 거래 금액 정보(판매 금액, 구매 금액, 차액)

	if (status === 'loading')
		return (
			<S.Wrapper>
				{Array(4)
					.fill()
					.map(i => (
						<LoadingSkeleton key={i} width={'100%'} height={'100%'} />
					))}
			</S.Wrapper>
		)

	return (
		<S.Wrapper>
			<AmountItemBox title={'sale'} price={amount?.totalSaleAmount || 0} />
			<AmountItemBox
				title={'purchase'}
				price={amount?.totalPurchaseAmount || 0}
			/>
			<AmountItemBox title={'total'} price={totalDifferenceAmount} />
			<AmountTotalBox price={totalPrice} />
		</S.Wrapper>
	)
}
export default AmountSection

const Wrapper = styled.div`
	width: 100%;
	height: 13rem;
	padding: 2rem;
	border-radius: 0.3rem;
	${ColumnNumberCSS(4)}
	${FlexAlignCSS}
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		padding: 1rem;
	}
`

const S = { Wrapper }
