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
import ViewMap from './ViewMap'
import DaumPostCodeAddress from '../../../Components/DaumPostCodeAddress/DaumPostCodeAddress'

function ItemInfo({ imageList }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	const [hashReset, setHashReset] = useState()
	const [hashArr, setHashArr] = useState([])

	const [intPrice, setIntPrice] = useState()
	const [categoryCheckedNum, setCategoryCheckedNum] = useState()

	//동까지만 나오는 state
	const [resultAddress, setResultAddress] = useState()
	//위도 경도
	const [addressInfo, setAddressInfo] = useState()

	const priceToString = price => {
		const changePrice = Number(
			price.target.value.replaceAll(',', ''),
		).toLocaleString()

		setIntPrice(changePrice)
	}

	const onSubmit = data => {
		let price = Number(data.price.replace(/,/g, ''))
		if (data.category == '0') {
			price = 0
		}

		let totaldata = {
			title: data.title,
			price: price,
			description: data.description,
			region: resultAddress,
			category: data.category,
			tag: hashArr,
			images: imageList,
		}
	}

	const checkedCategory = e => {
		const checkedNum = e.target.value
		if (checkedNum === '0') {
			setIntPrice(0)
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
			setHashReset('')
			if (e.target.value.trim().length === 0) return
			setHashArr(prev => [
				...prev,
				{ value: e.target.value, id: Math.floor(Math.random() * 100000) },
			])
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
							<S.TagText>{hash.value}</S.TagText>
							<DelButton onClick={() => deleteTagItem(hash)}>X</DelButton>
						</S.TagItem>
					))}
					<S.StyledInput
						value={hashReset}
						onKeyDown={onkeyDown}
						placeholder="태그를 ,(콤마)와 함께 입력해주세요."
						{...register('hash', {
							required:
								hashArr.length === 0 && '최소 하나 이상 태그 작성해주세요 ',
							onChange: e => {
								setHashReset(e.target.value)
							},
						})}
					/>
					{errors.hash && (
						<S.Error>
							<AlertText type={'error'}>{errors.hash.message}</AlertText>
						</S.Error>
					)}
				</S.TagBox>
			</S.InputWrap>

			<S.MiddleWrap>
				<S.InputWrapCheckBox>
					<S.InputLabelCheckBox>카테고리 *</S.InputLabelCheckBox>
					<S.InputValueCheckBox>
						<S.InputRadioWrap>
							<S.Radio
								type="radio"
								name="category"
								value={'0'}
								{...register('category', {
									required: '무료나눔 혹은 중고상품 선택해주세요 ',
								})}
								onClick={checkedCategory}
							/>
							<S.Label>무료나눔</S.Label>
						</S.InputRadioWrap>
						<S.InputRadioWrap>
							<S.Radio
								type="radio"
								name="category"
								value={'1'}
								{...register('category', {
									required: '무료나눔 혹은 중고상품 선택해주세요 ',
								})}
								onClick={checkedCategory}
							/>
							<S.Label>중고거래</S.Label>
						</S.InputRadioWrap>
					</S.InputValueCheckBox>
					{errors.category && (
						<S.ErrorCategory>
							<AlertText type={'error'}>{errors.category.message}</AlertText>
						</S.ErrorCategory>
					)}
				</S.InputWrapCheckBox>

				<S.InputWrapPrice>
					<S.InputLabelPrice>가격 *</S.InputLabelPrice>
					<S.InputValuePrice>
						<Input
							{...register('price', {
								required: categoryCheckedNum !== '0' && '가격을 입력해주세요',
								onChange: e => {
									priceToString(e)
								},
							})}
							disabled={categoryCheckedNum === '0' ? true : false}
							value={intPrice}
						/>

						{errors.price && (
							<S.Error>
								<AlertText type={'error'}>{errors.price.message}</AlertText>
							</S.Error>
						)}
					</S.InputValuePrice>
				</S.InputWrapPrice>
			</S.MiddleWrap>

			<S.InputWrap>
				<S.InputLabel>상품설명 *</S.InputLabel>
				<S.InputValue>
					<S.Textarea
						placeholder="상품 설명을 입력해주세요."
						{...register('description', FORM_TYPE.PRODUCT_DESCRIPTION_TYPE)}
					/>
					{errors.description && (
						<S.Error>
							<AlertText type={'error'}>{errors.description.message}</AlertText>
						</S.Error>
					)}
				</S.InputValue>
			</S.InputWrap>
			<S.InputWrap>
				<S.InputLabel>거래지역 *</S.InputLabel>
				<S.InputValueAddress>
					<AddressInput
						placeholder="거래 주소를 검색해주세요"
						value={resultAddress}
						readOnly
					/>
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
							<DaumPostCodeAddress
								setResultAddress={setResultAddress}
								setAddressInfo={setAddressInfo}
							/>
						</Modal>
					)}
				</S.InputValueAddress>
			</S.InputWrap>
			<ViewMap addressInfo={addressInfo} />
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
const InputWrapPrice = styled.div`
	padding: 1.5rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	${GridCenterCSS}
	width: 100%;
	justify-items: flex-start;
	${ColumnNumberCSS(5)}
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
`
const InputWrapCheckBox = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		flex-direction: column;
		align-items: flex-start;
		padding-top: 1.6rem;
		justify-content: space-between;
	}
`
const MiddleWrap = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
`
const ButtonWrap = styled.div`
	${FlexCenterCSS}
`
const InputRadioWrap = styled.div`
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
	}
`

const InputLabel = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const InputLabelPrice = styled.div`
	grid-column-start: 1;
	grid-column-end: 1;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`
const InputLabelCheckBox = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	margin-right: 3rem;
`
const Label = styled.label`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	margin-right: 2rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`

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
const ErrorCategory = styled.div`
	padding-left: 21%;
	width: 100%;
	margin-top: 1rem;
`

const InputValue = styled.div`
	grid-column-start: 2;
	grid-column-end: 11;
	width: 100%;
`

const InputValueAddress = styled.div`
	grid-column-start: 2;
	grid-column-end: 11;
	width: 100%;
	display: flex;
`

const InputValuePrice = styled.div`
	grid-column-start: 2;
	grid-column-end: 6;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const InputValueCheckBox = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
	}
`

const Textarea = styled.textarea`
	width: 100%;
	height: 30rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	padding: 1rem 1.2rem;
`

const StyledInput = styled(Input)`
	display: inline-flex;
	border: none;
	outline: none;
	cursor: text;
`

const AddressInput = styled(Input)`
	height: 4.8rem;
	width: 50%;
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
	MiddleWrap,
	InputWrapPrice,
	InputWrap,
	ButtonWrap,
	InputValuePrice,
	InputLabelPrice,
	InputValue,
	InputValueCheckBox,
	InputValueAddress,
	InputWrapCheckBox,
	InputRadioWrap,
	Textarea,
	InputLabel,
	Error,
	Label,
	InputLabelCheckBox,
	TagItem,
	TagText,
	StyledInput,
	TagBox,
	Radio,
	ErrorCategory,
}
