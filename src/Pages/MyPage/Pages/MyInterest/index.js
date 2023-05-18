import styled from 'styled-components'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../../../Styles/common'
import ItemBox from '../../../../Components/ItemBox/ItemBox'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetMyInterest from '../../../../Hooks/Queries/get-myInterest'

function MyInterest() {
	const { data, error, status, isLoading, isError } = useGetMyInterest()
	const [myInterest, setMyInterest] = useState({ ...data })
	const navigate = useNavigate()

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			const { data } = await MyPageApi.likeProduct({ page: 1 })
	// 			setMyInterest({ ...data })
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	}
	// 	getData()
	// }, [])

	return (
		<S.Wrapper>
			<S.Container>
				{productsMock.map((item, index) => {
					// myInterest.map((item, index) => {
					return (
						<ItemBox
							title={item.title}
							price={item.price}
							posterPath={item.image_url}
							context={item.description}
							isLiked={item.liked}
							key={index}
							onClick={() => navigate(`/detail/${item.idx}`)}
						/>
					)
				})}
			</S.Container>
		</S.Wrapper>
	)
}

export default MyInterest

const Wrapper = styled.div`
	${WidthAutoCSS}
`
const Container = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(4)};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
		gap: 3rem 1rem;
	}
`

const S = {
	Wrapper,
	Container,
}
