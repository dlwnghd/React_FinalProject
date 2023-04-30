import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../../../Components/Button/Button'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../Atoms/modal.atom'
import Modal from '../../../Components/Modal/Modal'
import GPS from './GPS'
function ItemInfo() {
	const {
		register,
		formState: { errors },

		handleSubmit,
	} = useForm({ mode: onblur })

	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	//천단위 , 출력
	const [intPrice, setIntPrice] = useState()

	const priceToString = price => {
		const changePrice = Number(price.target.value.replaceAll(',', ''))
		setIntPrice(changePrice.toLocaleString())
	}
	const onSubmit = () => {}

	//modal open
	const modalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsOpenModal(true)
	}
	return (
		<S.WrapperInfo onSubmit={handleSubmit(onSubmit)}>
			<InputWrap>
				<InputLabel>상품명 *</InputLabel>
				<InputValue>
					<Input
						placeholder="상품 제목을 입력해주세요."
						{...register('title', {
							required: '상품명을 입력해주세요',
						})}
					/>
				</InputValue>
			</InputWrap>
			{errors.title && <Error>ddd</Error>}
			<InputWrap>
				<InputLabel>태그 *</InputLabel>
				<InputValue>
					<Input placeholder="태그를 ,(콤마)와 함께 입력해주세요." />
				</InputValue>
			</InputWrap>

			<MiddleWrap>
				<InputWrap2>
					<InputLabel2>카테고리 *</InputLabel2>
					<InputValue2>
						<Input placeholder="0: 무료나눔 / 1: 중고거래" />
					</InputValue2>
				</InputWrap2>
				<InputWrap2>
					<InputLabel2>가격 *</InputLabel2>
					<InputValue2>
						<Input type="number" value={intPrice} />
					</InputValue2>
				</InputWrap2>
			</MiddleWrap>

			<InputWrap>
				<InputLabel>상품설명 *</InputLabel>
				<InputValue>
					<Textarea placeholder="상품 제목을 입력해주세요." />
				</InputValue>
			</InputWrap>
			<InputWrap>
				<InputLabel>거래지역 *</InputLabel>
				<InputValue>
					<Button
						shape={'square'}
						variant={'default-reverse'}
						onClick={modalOpen}
					>
						주소 검색
					</Button>
					{isOpenModal && (
						<Modal size={'large'}>
							<h1>주소 검색</h1>
							<GPS />
						</Modal>
					)}
				</InputValue>
			</InputWrap>
		</S.WrapperInfo>
	)
}
export default ItemInfo

const WrapperInfo = styled.form``
const Error = styled.div``
const InputWrap = styled.div`
	padding: 1.5rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	${GridCenterCSS}
	justify-items: flex-start;
	${ColumnNumberCSS(10)}
`
const InputWrap2 = styled.div`
	padding: 1.5rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	${GridCenterCSS}
	width: 100%;
	justify-items: flex-start;
	${ColumnNumberCSS(5)}
`
const InputLabel = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const InputValue = styled.div`
	grid-column-start: 2;
	grid-column-end: 11;
	width: 100%;
`

const InputLabel2 = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const InputValue2 = styled.div`
	grid-column-start: 2;
	grid-column-end: 6;
	width: 100%;
`
const MiddleWrap = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
`
const Textarea = styled.textarea`
	width: 100%;
	height: 30rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	padding: 1rem 1.2rem;
`
const S = {
	WrapperInfo,
}
