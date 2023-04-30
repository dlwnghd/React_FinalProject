import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import ProductList from './Components/ProductList'

function List() {
	return (
		<S.ListWrapper>
			<S.Main>
				<S.ListInfoWrapper>
					<div>
						<p>4,234개의 상품</p>
					</div>
					<span>
						<select>
							<option value="default">최신순</option>
							<option value="0">인기순</option>
							<option value="1">가격 낮은순</option>
							<option value="2">가격 높은순</option>
						</select>
					</span>
				</S.ListInfoWrapper>
				<ProductList />
			</S.Main>
		</S.ListWrapper>
	)
}

export default List

const ListWrapper = styled.div`
	${WidthAutoCSS};
	margin: 2rem auto;
	display: flex;
	justify-content: space-between;
`

const Main = styled.div`
	width: 100%;
`
const ListInfoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 3rem;
`
const Items = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(3)}
	row-gap: 2rem;
`
const Item = styled.div`
	width: fit-content;
	background-color: rgb(207 207 207);
`

const ImageContainer = styled.div`
	position: relative;

	& > button {
		position: absolute;
		top: 0;
		right: 0;
	}
`

const S = {
	ListWrapper,
	Main,
	ListInfoWrapper,
	Items,
	Item,
	ImageContainer,
}
