import styled from 'styled-components'
import ChatUserBox from './UserBox/UserBox'

function UserList() {
	//이거 그냥 for문 돌리는 mock데이터 에요
	//userList 배열로 해서 있는 만큼 맵 돌리고 그 안에 데이터는 그냥 제가 만들어서 보냈습니다.
	//
	let user = {
		profile_img:
			'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1UzB/image/paEOLJhjPWh-CW7c2KoUJ-tKWs4.jpg',
		nickName: '윤동영',
		region: '역삼역',
		day: '3주 전',
		content: '네고 가능할까요?',
		product_img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebPiv0U2x9olTM8u_YueCNJPWJXSJjNGZlA&usqp=CAU',
	}
	let userList = []
	for (let i = 0; i < 10; i++) {
		userList.push(user)
	}
	// 여기까지 목데이터

	return (
		<>
			{userList.map(list => (
				<S.ChatListContainer>
					<ChatUserBox list={list} />
					<S.ImgBox images={list.product_img} />
				</S.ChatListContainer>
			))}
		</>
	)
}

export default UserList

const ChatListContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
`
const ImgBox = styled.div`
	width: 5.5rem;
	height: 5.5rem;
	margin-right: 2rem;
	background: ${({ images }) => (images ? `url(${images})` : '이미지없음')}
		no-repeat center center;
	background-size: cover;
`
const S = {
	ChatListContainer,
	ImgBox,
}
