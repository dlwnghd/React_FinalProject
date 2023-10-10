import styled from 'styled-components'
import { useNavigate } from 'react-router'
import {
	ColumnNumberCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../../Styles/common'
import Button from '../../../../Components/Button/Button'
import TagsItem from '../../../../Components/TagItem/TagsItem'
import { useState } from 'react'
import useChatModal from '../../../../Hooks/useChatModal'
import ChatApi from '../../../../Apis/chatApi'
import { myChatRoomList } from '../../../../Atoms/myChatRoomList.atom'
import { useRecoilState } from 'recoil'
import Heart from '../../../../Components/Heart/Heart'
import SellerInfo from './Components/SellerInfo'
import { useSocket } from '../../../../Context/socket'

function Description({ detailProduct, detailIsLoading, detailStatus }) {
	if (detailIsLoading && detailStatus === 'loading') return
	const {
		title,
		idx,
		status,
		liked,
		price,
		createdAt,
		category,
		description,
		ProductsTags,
		User,
	} = detailProduct.searchProduct
	const socket = useSocket()

	const navigate = useNavigate()
	const [isLiked, setIsLiked] = useState(liked)
	const { openChat } = useChatModal()
	const [roomList, setRoomList] = useRecoilState(myChatRoomList)

	const createdDay = new Date(createdAt)
	const year = createdDay.getFullYear()
	const month = createdDay.getMonth() + 1
	const day = createdDay.getDate()

	const heartProps = {
		like: liked,
		prod_idx: idx,
		change_size: '24',
	}
	const isMobile = () => {
		const user = navigator.userAgent
		let isCheck = false

		if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
			isCheck = true
		}

		return isCheck
	}

	const check = isMobile()

	const onNavigateRecentPrice = () => {
		const searchParams = new URLSearchParams({ quote: title }).toString()
		navigate(`/recent-price?${searchParams}`)
	}

	const user = JSON.parse(localStorage.getItem('userInfo'))

	const makeChatRoom = async () => {
		try {
			const res = await ChatApi.makeChat(idx)

			if (res.status === 200) {
				socket.emit('sendMessage')
				await ChatApi.sendMsg({
					room_idx: res.data.idx,
					message: '채팅방을 생성합니다',
				})
				const list = await ChatApi.chatRoomList()

				setRoomList(list.data)
			}
			openChat()
		} catch (err) {
			if (err.response && err.response.status === 400) {
				openChat()
			}
		}
	}

	return (
		<S.Wrapper>
			<S.TitleContainer>
				<div>
					<div>
						<h3>{title}</h3>
						<div>
							<p>{status}</p>
							<S.StyledSubButton onClick={onNavigateRecentPrice}>
								시세보기
							</S.StyledSubButton>
						</div>
					</div>
					<p>
						등록일 : {year}년 {month}월 {day}일
					</p>
				</div>
				<h2>{price === 0 ? '무료' : `${price.toLocaleString()}원`}</h2>
			</S.TitleContainer>
			<SellerInfo User={User} />
			<S.OptionContainer>
				<S.ButtonBox>
					<Heart {...heartProps} />

					<S.StyledMainButton
						variant={'no-border'}
						shape={'soft'}
						size={'full'}
						onClick={() => {
							if (User.token !== user.token) {
								//내가 올린 상품이 아니라면~
								if (check) {
									navigate('/chat')
								} else {
									makeChatRoom()
								}
							} else if (User.token === user.token) {
								// 내가 올린 상품이라면~?
								if (check) {
									navigate('/chat')
								} else {
									openChat()
								}
							}
						}}
					>
						채팅
					</S.StyledMainButton>
				</S.ButtonBox>
			</S.OptionContainer>
			<hr />
			<S.DescriptionContainer>
				<div>
					<h4>카테고리 : {category === 0 ? '중고거래' : '무료나눔'}</h4>
					<p>{description}</p>
				</div>
				<S.TagBox>
					<>
						{ProductsTags.slice(0, 3).map((item, idx) => {
							return (
								<TagsItem
									key={idx}
									onClick={() => navigate(`/search/${item.Tag.tag}`)}
									size={'default'}
									shape={'round'}
									color={'default'}
								>
									<p>#{item.Tag.tag}</p>
								</TagsItem>
							)
						})}
					</>
				</S.TagBox>
			</S.DescriptionContainer>
		</S.Wrapper>
	)
}

export default Description

const Wrapper = styled.section`
	width: 100%;
	height: 100%;
	padding: 2rem 2rem 0;
	${FlexCenterCSS}
	justify-content: flex-start;
	flex-direction: column;
	align-items: flex-start;

	& > hr {
		width: 100%;
		height: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[300]};
		margin: 4rem 0;
	}
`

const TitleContainer = styled.div`
	width: 100%;
	margin-bottom: 3rem;

	& > div {
		margin-bottom: 2rem;

		& > div {
			margin-bottom: 1rem;
		}
	}

	& > div > div {
		${FlexBetweenCSS}
	}

	& > div > div > div {
		${FlexCenterCSS}
	}

	& > div > div > div > p:first-of-type {
		margin-right: 1rem;
	}
`

const DescriptionContainer = styled.div`
	width: 100%;

	& > div {
		margin-bottom: 3rem;
	}
	& > div > h4 {
		margin-bottom: 1rem;
	}
`

const OptionContainer = styled.div`
	width: 100%;
	${FlexBetweenCSS}
`

const TagBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(3)}
	gap:1rem;
`

const ButtonBox = styled.div`
	${FlexBetweenCSS}
	width:100%;
	column-gap: 1rem;
`

const StyledSubButton = styled(Button)`
	width: 10rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	height: 3.2rem;
`

const StyledMainButton = styled(Button)`
	& > p {
		font-size: 2rem;
		margin-right: 0.3rem;
	}

	${FlexCenterCSS}
	background: ${({ theme }) => theme.COLOR.common.black};
	color: ${({ theme }) => theme.COLOR.main};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	height: 6rem;
	border: none;
	box-sizing: border-box;
`

const S = {
	Wrapper,
	TitleContainer,
	DescriptionContainer,
	OptionContainer,
	ButtonBox,
	StyledMainButton,
	StyledSubButton,
	TagBox,
}
