import styled from 'styled-components'
import SellChatItemBox from './ItemBox/ItemBox'

function SellChatList({ list, onClickChatRoom }) {
	const prod_idx = list[0].product.idx
	const onClickJoinChat = () => {
		onClickChatRoom(prod_idx)
		// socket.emit('join', { idx })
	}
	// list.isRead == true이면? 채팅창 빨간불 끄고 false일땐 빨간불 들어오게 ui그려야함
	return (
		<S.ChatListContainer onClick={onClickJoinChat}>
			<SellChatItemBox list={list} />
			<span onClick={onClickJoinChat}>채팅방 목록 확인</span>
		</S.ChatListContainer>
	)
}

export default SellChatList

const ChatListContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	border-radius: 1px;
	:hover {
		/* background-color: ${({ theme }) => theme.COLOR.common.gray[200]}; */
		box-shadow: 2px 2px 2px ${({ theme }) => theme.COLOR.common.gray[200]};
		cursor: pointer;
	}
	& > span {
		position: absolute;
		border: none;

		width: auto;
		height: 3rem;
		bottom: 0;
		right: 1rem;
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
