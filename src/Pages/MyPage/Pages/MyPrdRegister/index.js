import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import MyPrdItemBox from './Components/MyPrdItemBox'
import MypageApi from '../../../../Apis/mypageApi'
import { useEffect } from 'react'
import { useState } from 'react'
import TypeSelectBox from './Components/TypeSelectBox'

function MyPrdRegister() {
	//일단 땜빵용으로 map돌리는 dummyData입니다.
	const dummyProduct = [
		{
			idx: Math.floor(Math.random() * 10000),
			ProductImages: [
				{
					imgUrl:
						'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDNfMjkx%2FMDAxNjMwNjM0MTAxNDI0.hy27U5BfUOjhg7_KRJwmwBkPPSFQPkbEzDyWvGitMHog.f_U_POWjwDLkn9mniEIULWf0wVnFEPaHfOkAUUS4R6gg.JPEG.rammme%2Foutput_3600092550.jpg&type=sc960_832',
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
						'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDNfMjkx%2FMDAxNjMwNjM0MTAxNDI0.hy27U5BfUOjhg7_KRJwmwBkPPSFQPkbEzDyWvGitMHog.f_U_POWjwDLkn9mniEIULWf0wVnFEPaHfOkAUUS4R6gg.JPEG.rammme%2Foutput_3600092550.jpg&type=sc960_832',
				},
			],
			ProductsTags: [{ tag: '태그1' }, { tag: '태그2' }, { tag: '태그3' }],
			createdAt: new Date(),
			image_url:
				'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDNfMjkx%2FMDAxNjMwNjM0MTAxNDI0.hy27U5BfUOjhg7_KRJwmwBkPPSFQPkbEzDyWvGitMHog.f_U_POWjwDLkn9mniEIULWf0wVnFEPaHfOkAUUS4R6gg.JPEG.rammme%2Foutput_3600092550.jpg&type=sc960_832',
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
			image_url:
				'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMjhfMjUg%2FMDAxNjY2OTE5NzgyNjY5.oHBZFQ8uu2OBDHBnNe85KCZTmI9X4hSyj-ZvkrlqNHUg.e_F6FM6zklDJ8EptMLBwt3OSBZROg6fqDDRutMygwsUg.JPEG.rkdls7710%2FIMG_0657.jpg&type=sc960_832',
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

	//등록상품 리스트 들고오기
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
	console.log(category)

	return (
		<S.Wrapper>
			<S.TotalNumAndFilter>
				<div>전체 {listArr.length}개</div>
				<TypeSelectBox setCategory={setCategory} />
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
	display: flex;
	justify-content: space-between;
	margin-top: 2rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
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
