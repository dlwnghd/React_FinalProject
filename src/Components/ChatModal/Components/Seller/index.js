import { useState } from 'react'
import ChatList from './List'
import ChatView from './View'

function SellerChat({ list }) {
	// 선택한 채팅방 채팅창 띄우기 STATE
	const [viewChatState, setViewChatState] = useState(false)
	// 선택한 상품의 prod_idx를 받아와서 PROPS로 뿌려준 뒤 socket.emit('join',{ viewChatIdx })
	const [viewChatIdx, setViewChatIdx] = useState(null)

	// 판매자 시점 - 판매자가 등록한 물품리스트 중 물품의 채팅리스트
	const onClickChatRoom = prod_idx => {
		setViewChatIdx(prod_idx)
		setViewChatState(true)
	}
	return (
		<>
			{!viewChatState &&
				list?.map((item, idx) => {
					return (
						<ChatList key={idx} list={item} onClickChatRoom={onClickChatRoom} />
					)
				})}

			{viewChatState && (
				<ChatView prod_idx={viewChatIdx} setViewChatState={setViewChatState} />
			)}
		</>
	)
}

export default SellerChat
