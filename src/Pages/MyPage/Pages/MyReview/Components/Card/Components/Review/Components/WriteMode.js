import { useEffect, useRef } from 'react'
import Stars from './Stars'
import * as S from './style'
import Button from '../../../../../../../../../Components/Button/Button'
import { useState } from 'react'

function WriteMode({ config, onClickChangeMode }) {
	const titleArea = useRef()
	const { title, content, ondo, img_url, ReviewImages } = config.data

	const [newReview, setNewReview] = useState({
		title,
		content,
		ondo,
		images: ReviewImages ?? [],
	})

	useEffect(() => {
		titleArea.current.focus()
	}, [])

	return (
		<S.Wrapper>
			<S.Container>
				<Stars config={config} />
				<S.BottomSection>
					<S.ContentSection>
						<S.TextAreaBox
							type={'title'}
							ref={titleArea}
							placeholder="제목을 입력해주세요"
						>
							{title}
						</S.TextAreaBox>
						<S.TextAreaBox
							type={'content'}
							placeholder="후기 내용을 입력해주세요"
						>
							{content}
						</S.TextAreaBox>
					</S.ContentSection>
					<S.ImageSection>
						<S.ImageBox imgURL={img_url} />
						{newReview.images.map(url => (
							<S.ImageBox key={url} imgURL={url} />
						))}
						{Array(3 - newReview.images.length)
							.fill('')
							.map((_, i) => (
								<S.ImageBox key={i} />
							))}
					</S.ImageSection>
				</S.BottomSection>
				<S.ButtonSection>
					<Button fontSize={'small'} size={'fit'} onClick={onClickChangeMode}>
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
