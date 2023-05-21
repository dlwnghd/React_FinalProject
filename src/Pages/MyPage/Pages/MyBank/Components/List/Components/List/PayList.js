import styled from 'styled-components'
import PayListItem from './ItemBox/PayListItem'
import { FlexCenterCSS } from '../../../../../../../../Styles/common'

function PayList({ status, category, payList }) {
	const categoryText = category === 'seller' ? '판매내역' : '구매내역'
	console.log(payList)

	if (status === 'loading')
		return (
			<S.Wrapper>
				<div>{/* 로딩 중 보여줄 컴포넌트 */}</div>
			</S.Wrapper>
		)

	if (status === 'error')
		return (
			<S.Wrapper>
				<S.EmptyListText>
					<p>조회에 실패했습니다.</p>
					<p>잠시 후 다시 시도해주세요</p>
				</S.EmptyListText>
			</S.Wrapper>
		)

	return (
		<S.Wrapper>
			{payList.length === 0 ? (
				<S.EmptyListText>
					<p>{categoryText} 내역이 없습니다.</p>
					<p>주문기간을 변경하여 확인해보세요!</p>
				</S.EmptyListText>
			) : (
				<S.Container>
					{payList.map((item, i) => (
						<PayListItem item={item} />
					))}
				</S.Container>
			)}
		</S.Wrapper>
	)
}
export default PayList

const Wrapper = styled.div`
	${FlexCenterCSS}
	min-height: 50vh;
	margin-top: 1rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 0.6rem;
`

const Container = styled.div``

const EmptyListText = styled.div`
	margin: auto;
	text-align: center;

	& > p:last-child {
		margin-top: 0.3rem;
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
`

const S = { Wrapper, Container, EmptyListText }
