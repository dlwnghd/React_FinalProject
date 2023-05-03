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
import AlertText from '../../../Components/AlertText/AlertText'
import { FORM_TYPE } from '../../../Consts/form.type'
import Modal from '../../../Components/Modal/Modal'
import GPS from '../Components/GPS'
import ViewMap from './ViewMap'

function ItemInfo() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ mode: 'onblur' })

	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)
	const [hashArr, setHashArr] = useState([])
	const [intPrice, setIntPrice] = useState()
	const [categoryCheckedNum, setCategoryCheckedNum] = useState()

	const priceToString = price => {
		const changePrice = Number(price.target.value.replaceAll(',', ''))
		setIntPrice(changePrice.toLocaleString())
	}

	const onSubmit = data => {
		console.log(data)
	}

	const checkedCategory = e => {
		const checkedNum = e.target.value
		if (checkedNum === '0') {
			setIntPrice('0')
		}
		setCategoryCheckedNum(checkedNum)
	}

	const modalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsOpenModal(true)
	}

	const onkeyDown = e => {
		if (e.nativeEvent.isComposing) return
		if (e.key === 'Enter') {
			e.preventDefault()
			if (e.target.value.trim().length === 0) return
			setHashArr(prev => [...prev, e.target.value])
		}
	}

	const deleteTagItem = e => {
		setHashArr(hashArr.filter(el => el !== e))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<S.InputWrap>
				<S.InputLabel>상품명 *</S.InputLabel>
				<S.InputValue>
					<Input
						placeholder="상품 제목을 입력해주세요."
						style={{ margin: '1rem 0' }}
						{...register('title', {
							required: '상품명을 입력해주세요',
						})}
					/>
					{errors.title && (
						<S.Error>
							<AlertText type={'error'}>{errors.title.message}</AlertText>
						</S.Error>
					)}
				</S.InputValue>
			</S.InputWrap>

			<S.InputWrap>
				<S.InputLabel>태그 *</S.InputLabel>
				<S.TagBox>
					{hashArr.map((hash, idx) => (
						<S.TagItem key={idx}>
							<S.TagText>{hash}</S.TagText>
							<DelButton onClick={() => deleteTagItem(hash)}>X</DelButton>
						</S.TagItem>
					))}
					<S.StyledInput
						onKeyDown={onkeyDown}
						placeholder="태그를 ,(콤마)와 함께 입력해주세요."
					/>
				</S.TagBox>
			</S.InputWrap>

			<S.MiddleWrap>
				<S.InputWrapCheckBox>
					<S.InputLabelCheckBox>카테고리 *</S.InputLabelCheckBox>
					<S.InputValueCheckBox>
						<S.Radio
							type="radio"
							name="category"
							value={'0'}
							{...register('category')}
							onClick={checkedCategory}
						/>
						<S.Label>무료나눔</S.Label>
						<S.Radio
							type="radio"
							name="category"
							value={'1'}
							{...register('category')}
							onClick={checkedCategory}
						/>
						<S.Label>중고거래</S.Label>
					</S.InputValueCheckBox>
				</S.InputWrapCheckBox>
				<S.InputWrap2>
					<S.InputLabel2>가격 *</S.InputLabel2>
					<S.InputValue2>
						<Input
							{...register('price', {
								required: '가격을 입력해주세요',
								onChange: e => {
									priceToString(e)
								},
							})}
							disabled={categoryCheckedNum === '0' ? true : false}
							value={intPrice}
						/>

						{intPrice !== '0' && errors.price && (
							<S.Error>
								<AlertText type={'error'}>{errors.price.message}</AlertText>
							</S.Error>
						)}
					</S.InputValue2>
				</S.InputWrap2>
			</S.MiddleWrap>

			<S.InputWrap>
				<S.InputLabel>상품설명 *</S.InputLabel>
				<S.InputValue>
					<S.Textarea
						placeholder="상품 설명을 입력해주세요."
						{...register('detail', FORM_TYPE.PRODUCT_DESCRIPTION_TYPE)}
					/>
					{errors.detail && (
						<S.Error>
							<AlertText type={'error'}>{errors.detail.message}</AlertText>
						</S.Error>
					)}
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
			<ViewMap />
			<S.ButtonWrap>
				<Button type="submit" style={{ margin: '4rem' }}>
					등록 완료
				</Button>
				<Button style={{ margin: '4rem' }}>취소</Button>
			</S.ButtonWrap>
		</form>
	)
}
export default ItemInfo
const Radio = styled.input`
	accent-color: ${({ theme }) => theme.COLOR.common.gray[200]};
	width: 1.7rem;
	height: 1.7rem;
	margin: 0 2rem;
`
const Error = styled.div`
	grid-column-start: 1;
	grid-column-end: 11;
	width: 100%;
	margin-top: 1rem;
`
const InputWrap = styled.div`
	padding: 1.5rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	${GridCenterCSS}
	justify-items: flex-start;
	${ColumnNumberCSS(10)}
	:last-child {
		border: none;
	}
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
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
	flex-direction: column;
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
	margin-right: 2rem;
`
const StyledInput = styled(Input)`
	display: inline-flex;
	border: none;
	outline: none;
	cursor: text;
`
const TagBox = styled.div`
	grid-column-start: 2;
	grid-column-end: 11;
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	&:focus-within {
		border-color: tomato;
	}
`
const TagItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0.5rem;
	padding: 0.5rem;
	background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 5px;
	color: white;
`
const TagText = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const DelButton = styled.button`
	width: 1.7rem;
	height: 1.7rem;
	margin-left: 0.5rem;
	background-color: white;
	border-radius: 50%;
`
const S = {
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
	TagItem,
	TagText,
	StyledInput,
	TagBox,
	Radio,
}
