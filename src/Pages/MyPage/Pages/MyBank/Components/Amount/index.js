import styled from 'styled-components'
import { ColumnNumberCSS, FlexCenterCSS } from '../../../../../../Styles/common'
import AmountItemBox from './Components/Box/AmountBox'
import AmountTotalBox from './Components/Box/TotalBox'
import LoadingSkeleton from '../../../../../../Components/Skeleton/Skeleton'
import ThisMonth from './Components/Box/ThisMonth'
import { useState } from 'react'
import StackedBar from './Components/StackedBar/StackedBar'

function AmountSection({ status, amount }) {
	const [clicked, setClicked] = useState(false)

	const totalDifferenceAmount =
		parseInt(amount?.totalSaleAmount || 0) -
		parseInt(amount?.totalPurchaseAmount || 0) // 총 거래 차액

	const totalPrice = {
		sale: amount?.totalSaleAmount || 0,
		purchase: amount?.totalPurchaseAmount || 0,
		difference: totalDifferenceAmount,
	} // 거래 금액 정보(판매 금액, 구매 금액, 차액)

	const onClickThisMonthBtn = () => setClicked(prev => !prev)

	if (status === 'loading')
		return (
			<S.Wrapper>
				{Array(4)
					.fill()
					.map(i => (
						<LoadingSkeleton key={i} width={'100%'} height={'10rem'} />
					))}
			</S.Wrapper>
		)

	if (status === 'error') {
		return (
			<S.Wrapper>
				<p>조회에 실패했습니다.</p>
			</S.Wrapper>
		)
	}

	return (
		<>
			<S.Wrapper>
				<AmountItemBox title={'sale'} price={amount?.totalSaleAmount || 0} />
				<AmountItemBox
					title={'purchase'}
					price={amount?.totalPurchaseAmount || 0}
				/>
				<AmountTotalBox price={totalPrice} />
				<ThisMonth clicked={clicked} onClick={onClickThisMonthBtn} />
			</S.Wrapper>
			{clicked && (
				<StackedBar
					status={status}
					clicked={clicked}
					sale={amount.thisMonthSaleAmount || 0}
					purchase={amount.thisMonthPurchaseAmount || 0}
				/>
			)}
		</>
	)
}
export default AmountSection

const Wrapper = styled.div`
	width: 100%;
	height: 13rem;
	padding: 2rem 2rem 5rem;
	margin-bottom: 5rem;
	border-radius: 0.3rem;
	${ColumnNumberCSS(4)}
	${FlexCenterCSS}
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		padding: 1rem;
		column-gap: 1rem;
	}
`

const S = { Wrapper }
