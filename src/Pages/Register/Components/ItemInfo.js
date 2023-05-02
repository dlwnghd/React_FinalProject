import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../../../Components/Button/Button'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../Atoms/modal.atom'
import Modal from '../../../Components/Modal/Modal'
import GPS from './GPS'
import Map from './Map'
import CheckBox from '../../../Components/CheckBox/CheckBox'
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
	const onSubmit = data => {
		console.log(data)
	}

	//modal open
	const modalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsOpenModal(true)
	}

	return (
		<S.WrapperInfo onSubmit={handleSubmit(onSubmit)}>
			<S.InputWrap>
				<S.InputLabel>상품명 *</S.InputLabel>
				<S.InputValue>
					<Input
						placeholder="상품 제목을 입력해주세요."
						{...register('title', {
							required: '상품명을 입력해주세요',
						})}
					/>
				</S.InputValue>
			</S.InputWrap>
			{errors.title && <S.Error>ddd</S.Error>}
			<S.InputWrap>
				<S.InputLabel>태그 *</S.InputLabel>
				<S.InputValue>
					<Input placeholder="태그를 ,(콤마)와 함께 입력해주세요." />
				</S.InputValue>
			</S.InputWrap>

			<S.MiddleWrap>
				<S.InputWrapCheckBox>
					<S.InputLabelCheckBox>카테고리 *</S.InputLabelCheckBox>
					<S.InputValueCheckBox>
						{/* <Input placeholder="0: 무료나눔 / 1: 중고거래" /> */}
						<CheckBox style={{ margin: ' 0 2rem' }} />
						<S.Label>무료나눔</S.Label>
						<CheckBox style={{ margin: ' 0 2rem' }} />
						<S.Label>중고거래</S.Label>
					</S.InputValueCheckBox>
				</S.InputWrapCheckBox>
				<S.InputWrap2>
					<S.InputLabel2>가격 *</S.InputLabel2>
					<S.InputValue2>
						<Input type="number" value={intPrice} />
					</S.InputValue2>
				</S.InputWrap2>
			</S.MiddleWrap>

			<S.InputWrap>
				<S.InputLabel>상품설명 *</S.InputLabel>
				<S.InputValue>
					<S.Textarea placeholder="상품 제목을 입력해주세요." />
				</S.InputValue>
			</S.InputWrap>
			<S.InputWrap>
				<S.InputLabel>거래지역 *</S.InputLabel>
				<S.InputValue>
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
				</S.InputValue>
			</S.InputWrap>
			<Map />
			<S.ButtonWrap>
				<Button style={{ margin: '4rem' }}>등록 완료</Button>
				<Button style={{ margin: '4rem' }}>취소</Button>
			</S.ButtonWrap>
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
	:last-child {
		border: none;
	}
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
	grid-column-end: 1;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const InputValue2 = styled.div`
	grid-column-start: 2;
	grid-column-end: 6;
	width: 100%;
	display: flex;
	align-items: center;
`
const InputLabelCheckBox = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	margin-right: 3rem;
`

const InputWrapCheckBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
`
const InputValueCheckBox = styled.div`
	display: flex;
	align-items: center;
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
const ButtonWrap = styled.div`
	${FlexCenterCSS}
`
const Label = styled.label`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
`
const S = {
	WrapperInfo,
	Textarea,
	MiddleWrap,
	InputValue2,
	InputLabel2,
	InputValue,
	InputLabel,
	InputWrap2,
	InputWrap,
	Error,
	ButtonWrap,
	Label,
	InputWrapCheckBox,
	InputValueCheckBox,
	InputLabelCheckBox,
}
