import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import {
	FlexBetweenCSS,
	ColumnNumberCSS,
	GridCenterCSS,
} from '../../../../Styles/common'
import MyPrdItemBox from './Components/MyPrdItemBox'
import MypageApi from '../../../../Apis/mypageApi'
import { useEffect } from 'react'
import { useState } from 'react'

function MyPrdRegister() {
	//일단 땜빵용으로 map돌리는 dummyData입니다.
	const dummyProduct = [
		{
			idx: Math.floor(Math.random() * 10000),
			ProductImages: [
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1487317448822l0.jpg',
				},
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
				},
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
				},
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1624267363401l0.jpg',
				},
			],
			ProductsTags: [{ tag: '태그1' }, { tag: '태그2' }, { tag: '태그3' }],
			createdAt: new Date(),
			image_url: 'https://img-cf.kurly.com/shop/data/goods/1649403816159l0.jpg',
			liked: 0,
			price: 0,
			status: '판매중',
			title: '네모난 고양이',
			description: '테스트는 고양이입니다. 고양이의 색깔은 무엇일까요? 하하',
			category: 0,
		},
		{
			idx: Math.floor(Math.random() * 10000),
			ProductImages: [
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1653037121952l0.jpeg',
				},
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1618795789687l0.jpg',
				},
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1649403816159l0.jpg',
				},
				{
					imgUrl:
						'https://img-cf.kurly.com/shop/data/goods/1624267363401l0.jpg',
				},
			],
			ProductsTags: [{ tag: '태그1' }, { tag: '태그2' }, { tag: '태그3' }],
			createdAt: new Date(),
			image_url: 'https://img-cf.kurly.com/shop/data/goods/1487317448822l0.jpg',
			liked: 1,
			price: 0,
			status: '판매완료',
			title: '금빛 고양이',
			description:
				'황금색 고양이는 테스트의 한 종류입니다. 금은 별처럼 반짝거립니다. 하하',
			category: 0,
		},
	]
	const listArr = []
	for (let i = 0; i < 10; i++) {
		listArr.push(...dummyProduct)
	}

	const [category, setCategory] = useState(0)

	useEffect(() => {
		const myPrdApi = async () => {
			try {
				const res = await MypageApi.productList({
					page: 1,
					category,
				})
				console.log(res.data.products)
			} catch {}
		}
		myPrdApi()
	}, [category])

	return (
		<S.Wrapper>
			<S.TotalNumAndFilter>
				<div>전체 {listArr.length}개</div>
				<select onChange={e => setCategory(e.target.value)}>
					<option value={0}>중고상품</option>
					<option value={1}>무료상품</option>
				</select>
			</S.TotalNumAndFilter>
			<S.PrdList>
				{listArr.map((item, idx) => {
					return <MyPrdItemBox key={idx} item={item} />
				})}
			</S.PrdList>
		</S.Wrapper>
	)
}

export default MyPrdRegister

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const TotalNumAndFilter = styled.div`
	${FlexBetweenCSS}
	font-size: ${({ theme }) => theme.FONT_SIZE.medium}
`

const PrdList = styled.div`
	width: 100%;
	margin-top: 4rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		column-gap: 1rem;
	}
`
const S = { Wrapper, TotalNumAndFilter, PrdList }
