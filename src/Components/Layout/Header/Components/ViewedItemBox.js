import styled from 'styled-components'
import { DeleteProduct_Icon } from '../../../Icons/Icons'
import { elapsedTime } from '../../../ItemBox/timeSet'
import ProductApi from '../../../../Apis/productApi'
import { FlexBetweenCSS } from '../../../../Styles/common'

// 컴포넌트 불러올 때, props로
// 데이터(상품 이미지, 상품 제목, 상품 설명, 상품 가격) 보내와서 입히기
function ViewedItemBox({
	refetch,
	posterPath,
	title,
	price,
	isLiked,
	createdAt,
	status,
	prod_idx,
	...rest
}) {
	const onDeleteView = async prod_idx => {
		try {
			await ProductApi.deleteViewedList(prod_idx)
			refetch()
		} catch (error) {
			console.error('아이템 삭제에 실패했습니다ㅠㅠ', error)
		}
	}

	return (
		<S.Wrapper>
			<DeleteProduct_Icon
				size="25"
				color="black"
				onClick={() => onDeleteView(prod_idx)}
			/>
			<S.IMGContainer posterIMG={posterPath} {...rest}></S.IMGContainer>
			<S.DescContainer {...rest}>
				<S.DescBox>
					<h4>{status}</h4>
					<h4>{title}</h4>
					<span>{price.toLocaleString()}원</span>
				</S.DescBox>
				<S.DescBox2>
					<span>{elapsedTime(createdAt)}</span>
				</S.DescBox2>
			</S.DescContainer>
		</S.Wrapper>
	)
}

export default ViewedItemBox

const Wrapper = styled.div`
	${FlexBetweenCSS}
	flex-direction: row;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 0;
	box-sizing: border-box;
	overflow: hidden;

	& > svg {
		position: absolute;
		z-index: 999;
		cursor: pointer;
		top: 1rem;
		right: 1.4rem;
		color: ${({ theme }) => theme.COLOR.main};

		// 파람으로 보낼 데이터의 디폴트와 변수를 구분해서 삼항 연산자로 정리
	}
`

const IMGContainer = styled.div`
	position: relative;
	cursor: pointer;
	width: 17rem;
	height: 17rem;
	background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center center;
	background-size: cover;
`

const DescContainer = styled.div`
	${FlexBetweenCSS}
	width:50%;
	height: 100%;
	padding: 0 1rem;
	flex-direction: column;
	align-items: baseline;
	/* background: red; */
`

const DescBox = styled.div`
	margin-top: 1rem;
	width: 100%;
	display: flex;
	gap: 3px;
	flex-direction: column;
	${({ context }) => context === '' && FlexBetweenCSS}

	& > h4 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	& > p {
		margin: 1rem 0 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space: nowrap; 1줄로 넘친 글자를 생략할 때 이용 */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
`

const DescBox2 = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
`

const S = {
	Wrapper,
	IMGContainer,
	DescContainer,
	DescBox,
	DescBox2,
}
