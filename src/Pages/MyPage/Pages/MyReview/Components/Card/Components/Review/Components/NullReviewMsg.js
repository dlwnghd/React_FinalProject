import Button from '../../../../../../../../../Components/Button/Button'
import MESSAGE from '../../../../../../../../../Consts/message'
import * as S from './style'

function NullReviewMsg({ setMode }) {
	return (
		<S.Wrapper>
			<S.Container>
				<S.AlertBox>
					<p>{MESSAGE.REVIEW.EMPTY}</p>
					<Button
						shape={'soft'}
						fontSize={'small'}
						onClick={() => setMode('write')}
					>
						작성하기
					</Button>
				</S.AlertBox>
			</S.Container>
		</S.Wrapper>
	)
}
export default NullReviewMsg
