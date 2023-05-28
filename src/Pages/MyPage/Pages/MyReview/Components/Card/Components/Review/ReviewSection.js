import * as S from './Components/style'
import { useState } from 'react'
import Stars from './Components/Stars'
import NullReviewMsg from './Components/NullReviewMsg'
import WriteMode from './Components/WriteMode'
import Button from '../../../../../../../../Components/Button/Button'

function ReviewSection({ idx, review }) {
	// 아직 작성하지 않았다면 review === null
	const [config, setConfig] = useState({
		state: 'read', // 'read' | 'write'
		data: review ?? {},
	})

	console.log({ review })

	const { title, content, ondo, img_url, ReviewImages } = config.data

	const onClickChangeMode = e => {
		switch (e.target.innerText) {
			case '취소':
				setConfig(prev => ({ ...prev, state: 'read' }))
				break
			case '수정':
				setConfig(prev => ({ ...prev, state: 'write' }))
				break
			case '삭제':
				break
			case '확인':
				if (!review) {
					// 등록인 경우
				} else {
					// 수정일 경우
				}
				setConfig(prev => ({ ...prev, state: 'read' }))
				break
		}
	}

	console.log(config.data)

	// 쓰기 모드
	if (config.state === 'write')
		return <WriteMode config={config} onClickChangeMode={onClickChangeMode} />

	// 읽기 모드
	// 리뷰가 없는 경우
	if (!review && config.state === 'read')
		return <NullReviewMsg setConfig={setConfig} />

	// 리뷰가 있는 경우
	return (
		<S.Wrapper>
			<S.Container>
				<Stars config={config} />
				<S.BottomSection>
					<S.ContentSection>
						<S.TextBox type={'title'}>{title}</S.TextBox>
						<S.TextBox type={'content'}>{content}</S.TextBox>
					</S.ContentSection>
					<S.ImageSection>
						<S.ImageBox imgURL={config.data.img_url} />
						<S.ImageBox imgURL={config.data.ReviewImages[0]} />
						<S.ImageBox imgURL={config.data.ReviewImages[1]} />
						<S.ImageBox imgURL={config.data.ReviewImages[2]} />
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
