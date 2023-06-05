import styled from 'styled-components'
import ChatItemBox from './ItemBox/ItemBox'

function ChatList({ list, onClickChatRoom }) {
	const prod_idx = list[0].product.idx

	const onClickJoinChat = () => {
		onClickChatRoom(prod_idx)
		// socket.emit('join', { idx })
	}
	// list.isRead == true이면? 채팅창 빨간불 끄고 false일땐 빨간불 들어오게 ui그려야함
	return (
		<S.ChatListContainer>
			<ChatItemBox list={list} />
			<button onClick={onClickJoinChat}>채팅방 목록 확인</button>
		</S.ChatListContainer>
	)
}

export default ChatList

const ChatListContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;

	& > button {
		position: absolute;
		border: none;
		background-color: #fff;
		width: auto;
		height: 3rem;
		bottom: 0;
		right: 0;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		cursor: pointer;
		:hover {
			color: ${({ theme }) => theme.COLOR.main};
		}
	}
`
const S = {
	ChatListContainer,
}
