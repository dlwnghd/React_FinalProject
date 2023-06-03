import styled, { keyframes } from 'styled-components'
import { FlexAlignCSS } from '../../Styles/common'
import getOndoToColor from '../../Utils/getOndoToColor'

function ProgressBar({ value }) {
	const progressValue = value && value >= 0 && value <= 100 ? value : 0

	return (
		<S.Container>
			<S.Container>
				<S.Progress value={progressValue} />
			</S.Container>
		</S.Container>
	)
}

export default ProgressBar

const Wrapper = styled.div`
	${FlexAlignCSS}
`

const Container = styled.div`
	width: 100%;
	height: 2rem;
	background-color: #e0e0e0;
	border-radius: 0.8rem;
`

const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${({ value }) => value}%;
  }
`

const Progress = styled.div`
	width: ${({ value }) => value}%;
	height: 100%;
	/* background-color: ${({ theme }) => theme.COLOR.main}; */
	background-color: ${({ value }) => getOndoToColor(value)};
	border-radius: 0.8rem;
	animation: ${progressAnimation} 1s ease-out;
`

const S = {
	Wrapper,
	Container,
	Progress,
}
