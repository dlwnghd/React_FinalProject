import styled from 'styled-components'

function RoomBox() {
	return (
		<S.RoomBoxContainer>
			<div>12345</div>
		</S.RoomBoxContainer>
	)
}

export default RoomBox

const RoomBoxContainer = styled.div`
	width: 100%;
	height: 100%;

	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`

const S = {
	RoomBoxContainer,
}
