import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import { useEffect } from 'react'
import RecentBanner from '../Main/Components/Banner/RecentBanner'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { isOnSideBar } from '../../Atoms/sideBar.atom'
import useGetMainPageData from '../../Hooks/Queries/get-mainPage'
import useGetDetailData from '../../Hooks/Queries/get-detailPage'
import Thumbnail from './Components/Thumbnail/Thumbnail'
import Description from './Components/Description/Description'

function Detail() {
	const { idx } = useParams()
	const [onSideBar, setOnSideBar] = useRecoilState(isOnSideBar)

	useEffect(() => {
		setOnSideBar(false)
	}, [idx])

	const { data: mainProduct, error, status, isLoading } = useGetMainPageData()

	const {
		data: detailProduct,
		status: detailStatus,
		error: detailError,
		isLoading: detailIsLoading,
	} = useGetDetailData(idx)

	if (isLoading && status === 'loading') return
	if (error && detailError) return

	return (
		<S.Wrapper>
			<S.MainContainer>
				<Thumbnail
					detailProduct={detailProduct}
					detailIsLoading={detailIsLoading}
					detailStatus={detailStatus}
				/>
				<Description
					detailProduct={detailProduct}
					detailIsLoading={detailIsLoading}
					detailStatus={detailStatus}
				/>
			</S.MainContainer>
			<Maps>
				<div>지도</div>
			</Maps>
			<S.PrdListBox>
				<RecentPrdList>
					<RecentBanner mainProduct={mainProduct} />
				</RecentPrdList>
				<AnotherPrdList>
					<h3>다른 상품 보러가기</h3>
					<div>다른 상품 리스트 영역</div>
				</AnotherPrdList>
			</S.PrdListBox>
		</S.Wrapper>
	)
}

export default Detail

const Wrapper = styled.section`
	${WidthAutoCSS}
	margin: 6rem auto;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		margin: 3rem auto;
	}
`

const MainContainer = styled.section`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	margin-bottom:6rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${ColumnNumberCSS(1)}
	}
`
const Maps = styled.div`
	width: 100%;
	background: ${({ theme }) => theme.COLOR.common.gray[100]};
	height: 25rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 100%;
	}
`
const PrdListBox = styled.div`
	width: 100%;
	margin: 6rem 0;

	${GridCenterCSS}
	${ColumnNumberCSS(1)}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 95%;
	}
`
const RecentPrdList = styled.div`
	width: 100%;
	margin-bottom: 6rem;
`
const AnotherPrdList = styled.div`
	width: 100%;

	& > h3 {
		margin-bottom: 1rem;
	}

	& > div {
		width: 100%;
		height: 20rem;
		background: ${({ theme }) => theme.COLOR.common.gray[100]};
	}
`
const S = {
	Wrapper,
	MainContainer,
	PrdListBox,
}
