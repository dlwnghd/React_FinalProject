import styled from 'styled-components'
import { FlexAlignCSS, FlexCenterCSS } from '../../../Styles/common'
import Input from '../../../Components/Input/Input'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../../../Components/Button/Button'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../Atoms/modal.atom'
import { FORM_TYPE } from '../../../Consts/form.type'
import Modal from '../../../Components/Modal/Modal'
import ViewMap from './ViewMap'
import DaumPostCodeAddress from '../../../Components/DaumPostCodeAddress/DaumPostCodeAddress'
// import ProductApi from '../../../Apis/productApi'
import FormItem from './InputComponents/FormItem'
import CategoryItem from './InputComponents/CategoryItem'
import PriceItem from './InputComponents/PriceItem'
import TagsItem from './InputComponents/TagsItem'
function Inputs({ imageList }) {
	const {
		control,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const watchedCategory = watch('category')

	console.log(watchedCategory)
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)

	const [hashReset, setHashReset] = useState()
	const [hashArr, setHashArr] = useState([])

	const [intPrice, setIntPrice] = useState()
	const [categoryCheckedNum, setCategoryCheckedNum] = useState()

	//동까지만 나오는 state
	const [resultAddress, setResultAddress] = useState()
	//위도 경도
	const [addressInfo, setAddressInfo] = useState('')

	// const priceToString = price => {
	// 	const changePrice = Number(
	// 		price.target.value.replaceAll(',', ''),
	// 	).toLocaleString()
	// 	setIntPrice(changePrice)
	// }

	const checkedCategory = e => {
		const checkedNum = e.target.value
		if (checkedNum === '1') {
			setIntPrice('0')
		}
		setCategoryCheckedNum(checkedNum)
		console.log(checkedNum)
	}

	const onSubmit = async data => {
		// let price = Number(data.price.replace(/,/g, ''))
		console.log(data)
		// if (data.category == '1') {
		// 	price = 0
		// }
		// if (!imageList) return alert('하나 이상 이미지 등록하세요.')
		// const formData = new FormData()
		// formData.append('title', data.title)
		// formData.append('price', price)
		// formData.append('description', data.description)
		// formData.append('region', resultAddress)
		// formData.append('category', Number(data.category))
		// formData.append('tag', hashArr)
		// formData.append('images', imageList)
		// console.log(formData)
		// try {
		// 	const response = await ProductApi.register(formData)
		// 	console.log(response)
		// } catch (err) {}
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
			setHashArr(prev => [...prev, e.target.value])
		}
	}

	const deleteTagItem = e => {
		setHashArr(hashArr.filter(el => el !== e))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="title"
				control={control}
				rules={FORM_TYPE.PRODUCT_TITLE_TYPE}
				render={({ field }) => (
					<FormItem name={'title'} errors={errors} field={field} />
				)}
			></Controller>
			<Controller
				name="hash"
				control={control}
				rules={{
					required: hashArr.length === 0 && '최소 하나 이상 태그 작성해주세요 ',
				}}
				render={({ field }) => (
					<TagsItem
						name={'hash'}
						errors={errors}
						field={field}
						hashArr={hashArr}
						onKeyDown={onkeyDown}
						onChange={e => setHashReset(e.target.value)}
						deleteTagItem={deleteTagItem}
						setHashReset={setHashReset}
						value={hashReset}
					/>
				)}
			></Controller>
			<Controller
				name="category"
				control={control}
				rules={
					categoryCheckedNum !== '1' ||
					(categoryCheckedNum !== '0' && {
						required: '무료나눔 혹은 중고상품 선택해주세요',
					})
				}
				render={({ field }) => (
					<CategoryItem
						errors={errors}
						field={field}
						value={'1'}
						onClick={checkedCategory}
					/>
				)}
			></Controller>
			<Controller
				name="price"
				control={control}
				rules={{ required: intPrice != '0' && '가격을 입력해주세요.' }}
				render={({ field }) => (
					<PriceItem errors={errors} field={field} value={intPrice} />
				)}
			></Controller>
			<Controller
				name="description"
				control={control}
				rules={FORM_TYPE.PRODUCT_DESCRIPTION_TYPE}
				render={({ field }) => (
					<FormItem name={'description'} errors={errors} field={field} />
				)}
			></Controller>

			<S.InputContainer>
				<h6>거래 지역 *</h6>
				<S.InputValueAddress>
					<AddressInput
						placeholder="거래 주소를 검색해주세요"
						value={resultAddress}
						readOnly
					/>

					<S.OpenMadalBtn
						type="button"
						value={'주소 검색'}
						onClick={modalOpen}
					/>
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
			</S.InputContainer>
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
export default Inputs

const InputContainer = styled.div`
	${FlexAlignCSS}
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	& > h6 {
		width: 14rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	}
`

const ButtonWrap = styled.div`
	${FlexCenterCSS}
`

const InputValueAddress = styled.div`
	grid-column-start: 2;
	grid-column-end: 11;
	width: 100%;
	display: flex;
`

const AddressInput = styled(Input)`
	height: 4.8rem;
	width: 50%;
`

const OpenMadalBtn = styled.input`
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	width: 16rem;
	height: 4.8rem;
	background-color: ${({ theme }) => theme.COLOR.common.gray[400]};

	border: none;
	&:hover {
		background-color: ${({ theme }) => theme.COLOR.common.gray[300]};
		transition: all 0.2s ease-in-out;
	}

	&:disabled {
		background-color: ${({ theme }) => theme.COLOR.common.gray[200]};
	}
`
const S = {
	InputValueAddress,

	OpenMadalBtn,
	ButtonWrap,
	InputContainer,
}
