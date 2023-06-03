import styled from 'styled-components'
import ChatBox from './ChatBox/ChatBox'
import RoomBox from './RoomBox/RoomBox'
import { ColumnNumberCSS, GridCenterCSS } from '../../../../Styles/common'

function ChatView({ prod_idx, room_state }) {
	console.log('chatview', prod_idx)
	return (
		<S.ChatViewContainer>
			<RoomBox prod_idx={prod_idx} />
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
