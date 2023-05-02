import { useState, useRef } from 'react'
import styled from 'styled-components'
import { ColumnNumberCSS, GridCenterCSS } from '../../../Styles/common'
import Button from '../../../Components/Button/Button'
import { Camera_Icon } from '../../../Components/Icons/Icons'

function Images() {
	const [imageList, setImageList] = useState([])
	const pictureInput = useRef()

	const handleClick = () => {
		pictureInput.current.click()
	}

	const onAddImg = e => {
		let file = e.target.files[0]
		const reader = new FileReader()
		reader.readAsDataURL(file)
		if (imageList.length >= 4) {
			return alert('이미지 입력은 최대 4개입니다')
		}
		return new Promise(resolve => {
			reader.onload = () => {
				if (imageList.find(el => el === reader.result))
					return alert('이미 선택한 이미지입니다.')
				setImageList([...imageList, reader.result])
				resolve()
			}
		})
	}

	//이미지 삭제
	const DelViewImg = e => {
		let filterImg = imageList.filter(el => el !== e)
		console.log(filterImg)
		setImageList(filterImg)
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
			<S.Title>
				<S.ImgTitle>상품 이미지 * ({imageList.length}/4)</S.ImgTitle>
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
					multiple="multiple"
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
					>
						<S.Img src={imageList[idx]} />
						<S.Del onClick={() => DelViewImg(e)}>❌</S.Del>
					</S.ImgBox>
				))}
			</S.Wrapper>
			<S.Hint>
				클릭 또는 드래그로 등록할 수 있어요. 드래그로 이미지 순서를 변경할 수
				있습니다.
			</S.Hint>
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
	${ColumnNumberCSS(4)}
`
const TotalWrapper = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	padding: 6rem 0 0 0;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
`
const ImgTitle = styled.div`
	height: 100%;
	margin-right: 2rem;
`
const ImgBox = styled.div`
	position: relative;
`
const Img = styled.img`
	width: 27.6rem;
	height: 27.6rem;
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
	right: 1rem;
	cursor: pointer;
`
const Title = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 3rem;
`
const S = { Img, Wrapper, Del, ImgBox, ImgTitle, TotalWrapper, Hint, Title }
