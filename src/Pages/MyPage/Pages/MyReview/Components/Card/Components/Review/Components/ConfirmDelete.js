import styled from 'styled-components'
import { FlexCenterCSS } from '../../../../../../../../../Styles/common'
import Button from '../../../../../../../../../Components/Button/Button'

function ConfirmDelete({ onConfirm, onCancel }) {
	return (
		<S.Wrapper>
			<S.Container>
				<h4>정말로 삭제하시겠어요?</h4>
				<div>
					<S.StyledButton onClick={onConfirm} shape={'soft'}>
						확인
					</S.StyledButton>
					<S.StyledButton
						onClick={onCancel}
						shape={'soft'}
						variant={'default-reverse'}
					>
						취소
					</S.StyledButton>
				</div>
			</S.Container>
		</S.Wrapper>
	)
}
export default ConfirmDelete

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.4);
	${FlexCenterCSS}
`

const Container = styled.div`
	background-color: ${({ theme }) => theme.COLOR.common.white};
	padding: 2rem;
	width: 30rem;
	border-radius: 0.8rem;
	${FlexCenterCSS}
	flex-direction: column;

	& > h4 {
		margin-bottom: 1rem;
	}
`

const StyledButton = styled(Button)`
	width: 10rem;
	height: 4rem;
	margin: 0 0.3rem;
`

const S = { Wrapper, Container, StyledButton }
