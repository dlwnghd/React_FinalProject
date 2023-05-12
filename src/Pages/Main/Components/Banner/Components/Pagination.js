import styled from 'styled-components'
import productsMock from '../../../../../__mock__/Data/Product/product.data'
import { FlexAlignCSS } from '../../../../../Styles/common'

function Pagination({ currentIdx }) {
	return (
		<S.Wrapper>
			{productsMock.slice(0, 4).map((prd, idx) => {
				return (
					<S.PaginationBox>
						{currentIdx === idx ? (
							<PaginationItems className="active"></PaginationItems>
						) : (
							<PaginationItems></PaginationItems>
						)}
					</S.PaginationBox>
				)
			})}
		</S.Wrapper>
	)
}

export default Pagination

const Wrapper = styled.div`
	position: absolute;
	${FlexAlignCSS};
	bottom: 1rem;
	left: 50%;
	transform: translateX(-50%);
`

const PaginationBox = styled.div`
	margin-right: 1rem;

	&:last-of-type {
		margin-right: 0;
	}

	& > .active {
		background: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
`

const PaginationItems = styled.div`
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	background: ${({ theme }) => theme.COLOR.common.gray[400]};
`

const S = {
	Wrapper,
	PaginationBox,
	PaginationItems,
}
