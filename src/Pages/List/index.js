import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GrayButton } from '../../Components/Button/Button'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import ProductList from './Components/ProductList'

function List() {
	const MENU_LIST = [
		{ title: '전체', list: ['전체'] },
		{ title: '인기매물', list: ['인기매물'] },
		{ title: '디지털기기', list: ['노트북', '컴퓨터', '청소기', '휴대폰'] },
		{ title: '생활가전', list: ['다리미', '선풍기', '밥솥'] },
		{ title: '가구/인테리어', list: ['의자', '책상', '소파'] },
		{ title: '생활/주방', list: ['접시', '컵', '그릇'] },
		{ title: '유아', list: ['장난감', '옷'] },
		{ title: '의류', list: ['남성', '여성', '가방', '신발', '모자'] },
		{
			title: '뷰티',
			list: ['스킨', '로션', '썬크림', '립스틱', '틴트', '핸드크림'],
		},
		{ title: '스포츠/레저', list: ['자전거', '공', '신발'] },
		{ title: '취미/게임/음반', list: ['레고', '스티커', '악기', '장난감'] },
		{ title: '도서', list: ['소설', '에세이', '학습/참고서', '자기계발'] },
		{
			title: '티켓/교환권',
			list: [
				'커피/식음료 교환권',
				'영화 관람권',
				'공연 관람권',
				'상품권',
				'숙박권',
				'기타',
			],
		},
		{ title: '가공식품', list: ['가공식품'] },
		{ title: '반려동물용품', list: ['반려동물용품'] },
		{ title: '식물', list: ['식물', '화분'] },
		{ title: '기타 중고물품', list: ['기타 중고물품'] },
	]

	const [activeIndex, setActiveIndex] = useState()

	const [hold, setHold] = useState('')
	const [productList, setProductList] = useState([])

	const getProductList = useCallback(async () => {
		const { data } = await axios.get('/api/product/', {})
		setProductList(data)
	}, hold)

	useEffect(() => {
		getProductList()
	}, [hold])

	return (
		<S.ListWrapper>
			<S.Main>
				<S.FilterOne>
					<div>
						<p>가구/인테리어 ➡️ 의자</p>
					</div>
					<div>
						<p>4,234개의 상품</p>
					</div>
				</S.FilterOne>
				<S.FilterTwo>
					<span>
						<select>
							<option value="default">최신순</option>
							<option value="0">인기순</option>
							<option value="1">가격 낮은순</option>
							<option value="2">가격 높은순</option>
						</select>
					</span>
				</S.FilterTwo>
				<ProductList productList={productList} />
			</S.Main>
			<GrayButton text={'내 정보 수정'} width={150} />
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

const SideMenu = styled.div`
	width: 15%;
`

const Main = styled.div`
	width: 85%;
`
const FilterOne = styled.div`
	display: flex;
	justify-content: space-between;
`
const FilterTwo = styled.div`
	text-align: right;
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
	SideMenu,
	Main,
	FilterOne,
	FilterTwo,
	Items,
	Item,
	ImageContainer,
}
