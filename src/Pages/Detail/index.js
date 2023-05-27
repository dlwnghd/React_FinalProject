import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { isOnSideBar } from '../../Atoms/sideBar.atom'
import useGetMainPageData from '../../Hooks/Queries/get-mainPage'
import useGetDetailData from '../../Hooks/Queries/get-detailPage'
import Thumbnail from './Components/Thumbnail/Thumbnail'
import Description from './Components/Description/Description'
import Contents from './Components/Contents/Contents'

function Detail() {
	const { idx } = useParams()
	const location = useLocation()
	const { state: liked } = location


	const setOnSideBar = useSetRecoilState(isOnSideBar)

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

	const detailProductList = {
		detailProduct,
		detailStatus,
		detailError,
	}

	if (status === 'loading') return
	if (detailStatus === 'loading') return
	if (error && detailError) return

	return (
		<S.Wrapper>
			<S.MainContainer>
				<Thumbnail {...detailProductList} />
				<Description {...detailProductList} liked={liked} />
			</S.MainContainer>
			<Maps>
				<div>지도</div>
			</Maps>
			<Contents mainProduct={mainProduct} />
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

const S = {
	Wrapper,
	MainContainer,
}
