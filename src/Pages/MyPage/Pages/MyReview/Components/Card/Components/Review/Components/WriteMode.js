import { useEffect, useRef, useState } from 'react'
import Stars from './Stars'
import * as S from './style'
import Button from '../../../../../../../../../Components/Button/Button'
import ImageInput from './ImageInput'

function WriteMode({ mode, onClickChangeMode, newReview, setNewReview }) {
	const titleArea = useRef()

	const { title, content, ondo } = newReview
	const [images, setImages] = useState(newReview.images)

	useEffect(() => {
		titleArea.current.focus()

		setNewReview(prev => ({
			...prev,
			title,
			content,
			ondo,
			images,
		}))
	}, [])

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
			setImages(prevImages => {
				const updatedImages = [...prevImages]
				updatedImages[idx] = reader.result
				return updatedImages
			})
		}
	}

	const onClickRemoveImage = index => {
		const newImages = [...images]
		const filteredImages = newImages.filter((_, i) => i !== index)
		setImages(filteredImages)
	}

	return (
		<S.Wrapper>
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
									imgURL={images[i]}
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
						disabled={!newReview.title || !newReview.content || !newReview.ondo}
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
