import { useRef } from 'react'
import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import Button from '../../../Components/Button/Button'
import { Camera_Icon, ModalClose_icon } from '../../../Components/Icons/Icons'
import AlertText from '../../../Components/AlertText/AlertText'
import { useState } from 'react'

function Images({ setImageFiles }) {
	const [imageList, setImageList] = useState([])
	const [imgNum, setImgNum] = useState(false)
	const pictureInput = useRef()

	const handleClick = () => {
		pictureInput.current.click()
	}

	const onAddImg = e => {
		const ImageLists = e.target.files
		setImageFiles(ImageLists)
		let ImageUrlLists = [...imageList]

		for (let i = 0; i < ImageLists.length; i++) {
			const currentImageUrl = URL.createObjectURL(ImageLists[i])
			ImageUrlLists.push(currentImageUrl)
		}

		if (ImageUrlLists.length > 5) {
			ImageUrlLists = ImageUrlLists.slice(0, 5)
		}

		setImageList(ImageUrlLists)
		console.log(imageList)
	}

	//이미지 삭제
	const DelViewImg = e => {
		let filterImg = imageList.filter(el => el !== e)
		setImageList(filterImg)
		setImgNum(() => false)
	}

	//Drag
	const dragStartIdx = useRef()
	const dragEnterIdx = useRef()

	//drag sort
	const onhandleSort = () => {
		let imgItems = [...imageList]

		//remove and save dragged item
		const draggedItemContent = imgItems.splice(dragStartIdx.current, 1)[0]

		//switch the position
		imgItems.splice(dragEnterIdx.current, 0, draggedItemContent)

		//reset the position ref
		dragStartIdx.current = null
		dragEnterIdx.current = null

		//update state value
		setImageList(imgItems)
	}

	return (
		<S.TotalWrapper>
			<MobileTitle>
				<Left>상품 등록</Left>
				<Right>
					<BoldTxt>*필수항목</BoldTxt>은 꼭 입력해주세요
				</Right>
			</MobileTitle>
			<S.Title>
				<S.ImgTitle>상품 이미지 * ({imageList.length}/5)</S.ImgTitle>
				<Button
					onClick={handleClick}
					shape={'square'}
					variant={'default-reverse'}
				>
					<Camera_Icon style={{ color: 'gray' }} />
				</Button>
			</S.Title>

			<S.Wrapper>
				<input
					type="file"
					accept="image/*"
					multiple
					style={{ display: 'none' }}
					ref={pictureInput}
					onChange={e => onAddImg(e)}
				/>
				{imageList.map((e, idx) => (
					<S.ImgBox
						key={idx}
						draggable
						onDragStart={() => (dragStartIdx.current = idx)}
						onDragEnd={onhandleSort}
						onDragEnter={() => (dragEnterIdx.current = idx)}
						onDragOver={e => e.preventDefault()}
					>
						<S.Img src={imageList[idx]} />
						<S.Del onClick={() => DelViewImg(e)}>
							<ModalClose_icon size={25} />
						</S.Del>
					</S.ImgBox>
				))}
				{imageList[0] && <MainImg>대표사진</MainImg>}
			</S.Wrapper>

			{imgNum ? (
				<S.Error>
					<AlertText type={'error'}>
						이미지 등록은 5개까지만 가능합니다.
					</AlertText>
				</S.Error>
			) : (
				<S.Hint>
					클릭 또는 드래그로 등록할 수 있어요. 드래그로 이미지 순서를 변경할 수
					있습니다.
				</S.Hint>
			)}
		</S.TotalWrapper>
	)
}
export default Images

const Hint = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	padding: 1.5rem 0;
`
const Wrapper = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(5)}
	position: relative;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
	}
`
const TotalWrapper = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	padding: 6rem 0 0 0;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
`
const ImgTitle = styled.div`
	height: 100%;
	margin-right: 2rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin-bottom: 2rem;
	}
`
const ImgBox = styled.div`
	position: relative;
`
const Img = styled.img`
	width: 20.6rem;
	height: 20.6rem;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.COLOR.common.gray[300]};
	}
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`
const Del = styled.span`
	font-size: 20px;
	position: absolute;
	top: 0.5rem;
	right: 0.2rem;
	cursor: pointer;
`
const Title = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3rem;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		flex-direction: column;
		align-items: flex-start;
	}
`
const MainImg = styled.div`
	width: 20.6rem;
	height: 4rem;
	background-color: #c3c5c7;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
`
const MobileTitle = styled.div`
	display: none;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
		margin-bottom: 3rem;
	}
`
const Left = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.big};
`
const Right = styled.div``
const BoldTxt = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
	color: ${({ theme }) => theme.COLOR.error};
`
const Error = styled.div`
	grid-column-start: 1;
	grid-column-end: 11;
	width: 100%;
	margin-top: 1rem;
`
const S = {
	Img,
	Wrapper,
	Del,
	ImgBox,
	ImgTitle,
	TotalWrapper,
	Hint,
	Title,
	MainImg,
	Error,
}
