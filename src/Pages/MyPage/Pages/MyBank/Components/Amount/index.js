import styled from 'styled-components'
import { ColumnNumberCSS, FlexAlignCSS } from '../../../../../../Styles/common'
import AmountItemBox from './Components/Box/ItemBox'
import AmountTotalBox from './Components/Box/TotalBox'

function AmountSection() {
	const amount = {
		totalSaleAmount: '10000',
		totalPurchaseAmount: '30000',
		thisMonthSaleAmount: '3000',
		thisMonthPurchaseAmount: '5000',
	}

	const totalDifferenceAmount =
		parseInt(amount?.totalSaleAmount || 0) -
		parseInt(amount?.totalPurchaseAmount || 0)

	const totalPrice = {
		sale: amount?.totalSaleAmount || 0,
		purchase: amount?.totalPurchaseAmount || 0,
		difference: totalDifferenceAmount,
	}

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
