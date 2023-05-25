import styled from 'styled-components'
import { FlexCenterCSS, WidthAutoCSS } from '../../../../Styles/common'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import MyPrdItemBox from './Components/MyPrdItemBox'
import { useState } from 'react'
import TypeSelectBox from './Components/TypeSelectBox'
// import MypageApi from '../../../../Apis/mypageApi'
// import MyPageApi from '../../../../Apis/mypageApi'
// import QUERY_KEY from '../../../../Consts/query.key'
import Pagination from '../../../../Components/Pagination/Pagination'
import useGetMyPagePrdRegisterData from '../../../../Hooks/Queries/get-myPagePrdRegister'
import Modal from '../../../../Components/Modal/Modal'
import { isOpenModalAtom } from '../../../../Atoms/modal.atom'
import { useRecoilState } from 'recoil'
import Button from '../../../../Components/Button/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductApi from '../../../../Apis/productApi'
import QUERY_KEY from '../../../../Consts/query.key'

function MyPrdRegister() {
	const [ProductIdx, setProductIdx] = useState()
	const [category, setCategory] = useState(0)

	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	const { data, isLoading, error } = useGetMyPagePrdRegisterData(category)

	const queryClient = useQueryClient()

	const { mutate } = useMutation(idx => ProductApi.delete(idx), {
		onSuccess: () => {
			queryClient.invalidateQueries([
				QUERY_KEY.GET_MYPAGE_REGISTER_DATA,
				category,
			])
			setIsOpenModal(false)
		},
		onError: err => {},
	})

	const onProductDeleteCheck = () => {
		mutate(ProductIdx)
	}

	console.log(category)
	return (
		<>
			{isLoading ? (
				<h1>'Loding...'</h1>
			) : (
				<>
					<S.Wrapper>
						<S.TotalNumAndFilter>
							<div>전체 {data.products.length}개</div>
							<TypeSelectBox setCategory={setCategory} category={category} />
						</S.TotalNumAndFilter>

						{isOpenModal && (
							<Modal size={'small'}>
								<S.ModalTextWrap>
									<S.ModalText>정말로 삭제하시겠습니까?</S.ModalText>
									<S.ButtonsWrap>
										<Button onClick={onProductDeleteCheck}>삭제</Button>
										<Button
											variant={'default-reverse'}
											onClick={() => setIsOpenModal(false)}
										>
											취소
										</Button>
									</S.ButtonsWrap>
								</S.ModalTextWrap>
							</Modal>
						)}
						<S.PrdList>
							{data?.products.map(item => {
								return (
									<MyPrdItemBox
										key={item.idx}
										item={item}
										category={category}
										setIsOpenModal={setIsOpenModal}
										setProductIdx={setProductIdx}
									/>
								)
							})}
						</S.PrdList>
					</S.Wrapper>
					<Pagination total={data?.count} limit={10} page={1} />
				</>
			)}
		</>
	)
}

export default MyPrdRegister

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin-bottom: 5rem;
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

const ModalText = styled.div`
	height: 100%;
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	margin-top: 3rem;
`
const ModalTextWrap = styled.div`
	${FlexCenterCSS}
	flex-direction: column;
`
const ButtonsWrap = styled.div`
	display: flex;
	margin-top: 3rem;
	* {
		margin: 0 1rem;
	}
`
const S = {
	Wrapper,
	TotalNumAndFilter,
	PrdList,
	ModalText,
	ModalTextWrap,
	ButtonsWrap,
}
