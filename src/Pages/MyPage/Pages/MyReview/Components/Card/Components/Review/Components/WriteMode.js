import { useEffect, useRef, useState } from 'react'
import Stars from './Stars'
import * as S from './style'
import Button from '../../../../../../../../../Components/Button/Button'
import ImageInput from './ImageInput'
import InnerError from './Error'

function WriteMode({
	mode,
	review,
	imageArray,
	setImageArray,
	originalImageLength,
	onClickChangeMode,
	newReview,
	setNewReview,
	errorData,
	setErrorData,
}) {
	const titleArea = useRef()

	const { title, content, ondo, images } = newReview

	const [concatImages, setConcatImages] = useState([...imageArray, ...images]) // 화면용
	const [isUpdateReview, setIsUpdateReview] = useState(false)

	useEffect(() => {
		titleArea.current.focus()

		setNewReview(prev => ({
			...prev,
			title,
			content,
			ondo,
		}))
	}, [])

	useEffect(() => {
		// 내용이 변경되었을 때만 확인 버튼을 활성화 하기 위해서
		const isDifferent =
			newReview.title !== review.title ||
			newReview.content !== review.content ||
			newReview.ondo !== review.ondo ||
			originalImageLength !== concatImages.length ||
			imageArray.some((img, idx) => img !== concatImages[idx])
		setIsUpdateReview(isDifferent)
	}, [newReview, concatImages])

	const onChangeReviewValues = e => {
		const { name, value } = e.target
		setNewReview(prev => ({ ...prev, [name]: value }))
	}

	const onChangeImages = (idx, newImage) => {
		const reader = new FileReader()
		reader.readAsDataURL(newImage)

		const newImages = [...newReview.images, newImage]
		setNewReview(prev => ({ ...prev, images: newImages })) // 우선 File 객체 형태의 이미지를 추가

		reader.onload = () => {
			setConcatImages(prevImages => {
				const updatedImages = [...prevImages]
				updatedImages[idx] = reader.result
				return updatedImages
			})
		}
	}

	const onClickRemoveImage = index => {
		if (newReview.images.length === 0) {
			// 새로운 이미지를 추가하지 않은 경우
			// 기존 이미지를 수정한 경우
			setImageArray(prev => prev.filter((_, i) => i !== index))
			return
		}
		const newImages = [...concatImages]
		const filteredImages = newImages.filter((_, i) => i !== index)
		setConcatImages(filteredImages)

		setNewReview(prev => ({ ...prev, images: newImages }))
	}

	useEffect(() => {
		setConcatImages([...imageArray, ...images])
	}, [imageArray])

	return (
		<S.Wrapper>
			{errorData && (
				<InnerError error={errorData} onCloseError={() => setErrorData(null)} />
			)}
			<S.Container>
				<Stars mode={mode} ondo={newReview.ondo} setNewReview={setNewReview} />
				<S.BottomSection>
					<S.ContentSection>
						<S.TextAreaBox
							name={'title'}
							defaultValue={title}
							ref={titleArea}
							placeholder="제목을 입력해주세요"
							onChange={onChangeReviewValues}
						/>

						<S.TextAreaBox
							name={'content'}
							defaultValue={content}
							placeholder="후기 내용을 입력해주세요"
							onChange={onChangeReviewValues}
						/>
					</S.ContentSection>
					<S.ImageSection>
						{Array(4)
							.fill('')
							.map((_, i) => (
								<ImageInput
									key={i}
									index={i}
									imgURL={concatImages[i]}
									onChangeImages={onChangeImages}
									onClickRemove={onClickRemoveImage}
								/>
							))}
					</S.ImageSection>
				</S.BottomSection>
				<S.ButtonSection>
					<Button
						fontSize={'small'}
						size={'fit'}
						onClick={onClickChangeMode}
						disabled={
							!newReview.title ||
							!newReview.content ||
							!newReview.ondo ||
							!isUpdateReview
						}
					>
						확인
					</Button>
					<Button
						variant={'no-border'}
						fontSize={'small'}
						size={'fit'}
						onClick={onClickChangeMode}
					>
						취소
					</Button>
				</S.ButtonSection>
			</S.Container>
		</S.Wrapper>
	)
}
export default WriteMode
