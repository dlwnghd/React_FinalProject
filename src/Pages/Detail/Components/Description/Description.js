import styled from 'styled-components'
import {
	FillHeart_Icon,
	NotFillHeart_Icon,
} from '../../../../Components/Icons/Icons'
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

function Description({ detailProduct, detailIsLoading, detailStatus, liked }) {
	if (detailIsLoading && detailStatus === 'loading') return
	const {
		title,
		idx: prod_idx,
		status,
		price,
		category,
		description,
		ProductsTags,
	} = detailProduct.searchProduct

	const navigate = useNavigate()
	const [isLiked, setIsLiked] = useState(liked)
	const { openChat } = useChatModal()
	const [roomList, setRoomList] = useRecoilState(myChatRoomList)

	const user = JSON.parse(localStorage.getItem('userInfo'))

	// const {
	// 	data: heartData,
	// 	status: heartStatus,
	// 	refetch,
	// } = useGetHeartInterestData(idx, isLiked)

	const makeChatRoom = async () => {
		try {
			const res = await ChatApi.makeChat(prod_idx)

			if (res.status === 200) {
				const room_idx = res.data.idx
				await ChatApi.sendMsg(room_idx, '채팅방을 생성합니다')
				const list = await ChatApi.chatRoomList()

				setRoomList(list.data)
			}
			openChat()
		} catch (err) {
			console.log('에러 발생%', err)
			if (err.response && err.response.status === 400) {
				openChat()
			}
		}
	}
	const onHeart = () => {
		setIsLiked(prev => !prev)
	}

	// useEffect(() => {
	// 	refetch()
	// }, [isLiked])

	// if (heartStatus === 'loading') return

	return (
		<S.Wrapper>
			<S.TitleContainer>
				<div>
					<h3>{title}</h3>
					<p>{status}</p>
				</div>
				<h2>{price === 0 ? '무료' : `${price.toLocaleString()}원`}</h2>
			</S.TitleContainer>
			<S.OptionContainer>
				<S.HeartBox onClick={onHeart}>
					<p>찜</p>
					{isLiked ? (
						<FillHeart_Icon size="24" />
					) : (
						<NotFillHeart_Icon size="24" />
					)}
				</S.HeartBox>
				<S.ButtonBox>
					<S.StyledButton
						variant={'no-border'}
						shape={'soft'}
						size={'full'}
						onClick={makeChatRoom}
					>
						채팅
					</S.StyledButton>
				</S.ButtonBox>
			</S.OptionContainer>
			<hr />
			<S.DescriptionContainer>
				<div>
					<h4>{category === 0 ? '중고거래' : '무료나눔'}</h4>
					<p>{description}</p>
				</div>
				<S.TagBox>
					<>
						{ProductsTags.map((item, idx) => {
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
		${FlexBetweenCSS}
		margin-bottom:2rem;
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

const HeartBox = styled.div`
	${FlexCenterCSS}
	width:50%;
	height: 100%;
	border-radius: 1rem;
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);

	margin-right: 1rem;
	cursor: pointer;

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		color: ${({ theme }) => theme.COLOR.main};
	}

	& > svg {
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const TagBox = styled.div`
	${GridCenterCSS}
	${ColumnNumberCSS(3)}
	gap:1rem;
`

const ButtonBox = styled.div`
	${FlexBetweenCSS}
	width:50%;
`

const StyledButton = styled(Button)`
	background: ${({ theme }) => theme.COLOR.common.black};
	color: ${({ theme }) => theme.COLOR.common.white};
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
	HeartBox,
	ButtonBox,
	StyledButton,
	TagBox,
}
