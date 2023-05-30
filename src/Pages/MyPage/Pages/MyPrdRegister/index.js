import styled from 'styled-components'
import { FlexCenterCSS, WidthAutoCSS } from '../../../../Styles/common'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'
import MyPrdItemBox from './Components/MyPrdItemBox'
import { useEffect, useState } from 'react'
import TypeSelectBox from './Components/TypeSelectBox'
import Pagination from '../../../../Components/Pagination/Pagination'
import useGetMyPagePrdRegisterData from '../../../../Hooks/Queries/get-myPagePrdRegister'
import Modal from '../../../../Components/Modal/Modal'
import { isOpenModalAtom } from '../../../../Atoms/modal.atom'
import { useRecoilState } from 'recoil'
import Button from '../../../../Components/Button/Button'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../../../Apis/productApi'
import { useSearchParams } from 'react-router-dom'
import MESSAGE from '../../../../Consts/message'
// import ErrorModal from '../../../../Components/Modal/ErrorModal/ErrorModal'

function MyPrdRegister() {
	const [searchParams, setSearchParams] = useSearchParams()

	const params = {
		page: searchParams.get('page'),
		category: searchParams.get('category'),
	}

	const [ProductIdx, setProductIdx] = useState()
	const [category, setCategory] = useState(params.category)
	const [page, setPage] = useState(params.page)

	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)
	const [deleteOpenModal, setDeleteOpenModal] = useState(false)
	const { data, refetch, status } = useGetMyPagePrdRegisterData(page, category)

	const { mutate, error } = useMutation(idx => ProductApi.delete(idx), {
		onSuccess: () => {
			refetch()
			setIsOpenModal(false)
		},
		onError: err => {
			setIsOpenModal(() => false)
		},
	})
	console.log(error)
	const onProductDeleteCheck = () => {
		mutate(ProductIdx)
	}

	const closeModal = () => {
		setIsOpenModal(() => false)
		setDeleteOpenModal(() => false)
	}

	useEffect(() => {
		refetch()
	}, [page])

	return (
		<>
			{status === 'isLoading' && <h1>'Loding...'</h1>}

			{status === 'error' && (
				<S.AlertTextContainer>
					<p>조회에 실패했습니다.</p>
					<p>잠시 후 다시 시도해주세요</p>
					<div>
						<Button shape={'soft'} onClick={() => window.location.reload()}>
							새로고침
						</Button>
					</div>
				</S.AlertTextContainer>
			)}
			<>
				{status === 'success' && (
					<S.Wrapper>
						<S.TotalNumAndFilter>
							<div>전체 {data.pagination.count}개</div>

							<TypeSelectBox
								setCategory={setCategory}
								category={category}
								setPage={setPage}
								page={page}
								setSearchParams={setSearchParams}
							/>
						</S.TotalNumAndFilter>

						{isOpenModal && deleteOpenModal && (
							<Modal size={'small'}>
								<S.ModalTextWrap>
									<S.ModalText>{MESSAGE.DELETEPRODUCT.CHECK}</S.ModalText>
									<S.ButtonsWrap>
										<Button onClick={onProductDeleteCheck}>삭제</Button>
										<Button variant={'default-reverse'} onClick={closeModal}>
											취소
										</Button>
									</S.ButtonsWrap>
								</S.ModalTextWrap>
							</Modal>
						)}

						{data.pagination.count ? (
							<S.PrdList>
								{data?.products.map(item => {
									return (
										<MyPrdItemBox
											key={item.idx}
											item={item}
											category={category}
											setIsOpenModal={setIsOpenModal}
											setDeleteOpenModal={setDeleteOpenModal}
											setProductIdx={setProductIdx}
										/>
									)
								})}
							</S.PrdList>
						) : (
							<S.AlertTextContainer>
								<p>
									{category === '0' ? '중고상품' : '무료상품'} 내역이 없습니다.
								</p>
							</S.AlertTextContainer>
						)}
					</S.Wrapper>
				)}
			</>

			<Pagination
				totalPage={data?.pagination.totalPage}
				setPage={setPage}
				limit={10}
				scroll={300}
			/>
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
	${ColumnNumberCSS(5)};
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
const AlertTextContainer = styled.div`
	margin: auto;
	height: 50rem;
	${FlexCenterCSS}
	flex-direction: column;

	& > p:last-child {
		margin-top: 0.3rem;
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
	}

	& > div {
		margin-top: 1rem;
	}
`
const S = {
	Wrapper,
	TotalNumAndFilter,
	PrdList,
	ModalText,
	ModalTextWrap,
	ButtonsWrap,
	AlertTextContainer,
}
