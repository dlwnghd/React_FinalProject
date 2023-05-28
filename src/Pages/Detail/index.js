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

	if (detailIsLoading) return
	if (detailError) return

	return (
		<S.Wrapper>
			<S.MainContainer>
				<Thumbnail {...detailProductList} />
				<Description {...detailProductList} liked={liked} />
			</S.MainContainer>
			<Contents detailProduct={detailProduct} />
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

const S = {
	Wrapper,
	MainContainer,
}
