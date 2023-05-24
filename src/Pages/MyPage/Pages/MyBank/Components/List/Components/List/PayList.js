import styled from 'styled-components'
import PayListItem from './ItemBox/PayListItem'
import {
	ColumnNumberCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../../../../../../Styles/common'
import LoadingSkeleton from '../../../../../../../../Components/Skeleton/Skeleton'

function PayList({ status, category, payList }) {
	const categoryText = category === 'seller' ? '판매내역' : '구매내역'

	if (status === 'loading')
		return (
			<S.Wrapper>
				<S.Container>
					{Array(4)
						.fill()
						.map(i => (
							<LoadingSkeleton key={i} width={'100%'} height={'27.5rem'} />
						))}
				</S.Container>
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
						<PayListItem key={i} item={item} category={category} />
					))}
				</S.Container>
			)}
		</S.Wrapper>
	)
}
export default PayList

const Wrapper = styled.div`
	margin-top: 1rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 0.6rem;
`

const Container = styled.div`
	width: 100%;
	padding: 1rem;
	${GridCenterCSS}
	${ColumnNumberCSS(2)};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(1)}
		column-gap: 1rem;
	}
`

const EmptyListText = styled.div`
	margin: auto;
	height: 50rem;
	${FlexCenterCSS}
	flex-direction: column;

	& > p:last-child {
		margin-top: 0.3rem;
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
`

const S = { Wrapper, Container, EmptyListText }
