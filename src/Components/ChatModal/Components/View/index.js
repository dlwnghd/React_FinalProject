import styled from 'styled-components'
import ChatBox from './ChatBox/ChatBox'
import RoomBox from './RoomBox/RoomBox'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'

function ChatView() {
	return (
		<S.ChatViewContainer>
			<RoomBox />
			<ChatBox />
		</S.ChatViewContainer>
	)
}

export default ChatView

const ChatViewContainer = styled.div`
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(2)}
	border-radius: 3px;
`

const S = {
	ChatViewContainer,
}
