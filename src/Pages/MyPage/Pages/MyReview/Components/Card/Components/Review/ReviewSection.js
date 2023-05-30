import * as S from './Components/style'
import { useState } from 'react'
import Stars from './Components/Stars'
import NullReviewMsg from './Components/NullReviewMsg'
import WriteMode from './Components/WriteMode'
import Button from '../../../../../../../../Components/Button/Button'
import { usePostReview } from '../../../../../../../../Hooks/Queries/post-review'
import { useEffect } from 'react'

function ReviewSection({ idx, review }) {
	const isWrittenReview = Object.keys(review).length > 0
	const { title, content, ondo, img_url, ReviewImages } = review
	// 아직 작성하지 않았다면 review === null
	const [mode, setMode] = useState('read') // 'read' | 'write'

	const [newReview, setNewReview] = useState({
		title: '',
		content: '',
		ondo: ondo || 0,
		images: [],
	})

	// 서버 데이터와 클라이언트 데이터를 맞추는 함수
	const setReviewToNewReview = () => {
		setNewReview({
			title: title || '',
			content: content || '',
			ondo: ondo || 0,
			images: [
				...(img_url ? [img_url] : []),
				...(ReviewImages ? ReviewImages.map(({ img_url }) => img_url) : []),
			],
		})
	}

	useEffect(() => {
		setReviewToNewReview()
	}, [review])

	const postReview = usePostReview() // 리뷰 등록 (post)

	const onClickChangeMode = async e => {
		switch (e.target.innerText) {
			case '취소':
				setMode('read')
				setReviewToNewReview()
				break

			case '수정':
				setMode('write')
				break

			case '삭제':
				break

			case '확인':
				if (!isWrittenReview) {
					// 등록인 경우
					const formData = new FormData()
					Object.entries(newReview).forEach(([key, value]) => {
						if (key === 'images' && Array.isArray(value)) {
							value.forEach(img => {
								formData.append('images', img)
							})
						} else {
							formData.append(key, value)
						}
					})
					await postReview.mutateAsync({
						payList_idx: idx,
						newReview: formData,
					})
				} else {
					// 수정일 경우
					console.log(newReview)
				}
				setMode('read')
				break
		}
	}

	// 쓰기 모드
	if (mode === 'write')
		return (
			<WriteMode
				mode={mode}
				onClickChangeMode={onClickChangeMode}
				newReview={newReview}
				setNewReview={setNewReview}
			/>
		)

	// 읽기 모드
	// 리뷰가 없는 경우
	if (!isWrittenReview && mode === 'read')
		return <NullReviewMsg setMode={setMode} />

	// 리뷰가 있는 경우
	return (
		<S.Wrapper>
			<S.Container>
				<Stars mode={mode} ondo={newReview.ondo} setNewReview={setNewReview} />
				<S.BottomSection>
					<S.ContentSection>
						<S.TextBox type={'title'}>{newReview.title}</S.TextBox>
						<S.TextBox type={'content'}>{newReview.content}</S.TextBox>
					</S.ContentSection>
					<S.ImageSection>
						{Array(4)
							.fill('')
							.map((_, i) => (
								<S.ImageBox key={i} imgURL={newReview.images[i]} />
							))}
					</S.ImageSection>
				</S.BottomSection>
				<S.ButtonSection>
					<Button fontSize={'small'} size={'fit'} onClick={onClickChangeMode}>
						수정
					</Button>
					<Button
						variant={'no-border'}
						fontSize={'small'}
						size={'fit'}
						onClick={onClickChangeMode}
					>
						삭제
					</Button>
				</S.ButtonSection>
			</S.Container>
		</S.Wrapper>
	)
}
export default ReviewSection
