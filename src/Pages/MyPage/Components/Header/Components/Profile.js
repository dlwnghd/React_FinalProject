import styled from 'styled-components'
import {
	FadeInKeyFrame,
	FlexAlignCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
	WidthAutoCSS,
} from '../../../../../Styles/common'
import ProgressBar from '../../../../../Components/Progress/ProgressBar'
import { Down_Icon, Info_Icon } from '../../../../../Components/Icons/Icons'
import getOndoToColor from '../../../../../Utils/getOndoToColor'
import { useState } from 'react'

function Profile({ mainData }) {
	const [isHoverInfo, setIsHoverInfo] = useState(false)
	return (
		<S.Wrapper>
			<S.ProfileWrapper>
				<S.ProfileImg
					src={
						mainData.User.profileUrl ??
						'https://static.nid.naver.com/images/web/user/default.png?type=s160'
					}
				/>
				<S.ProfileNickName>{mainData.User.nickName}</S.ProfileNickName>
			</S.ProfileWrapper>

			{/* <S.ButtonWrapper>
				<S.StyledButton onClick={() => navigate('/mypage/useredit-userinfo')}>
					내 정보 설정
				</S.StyledButton>
				<S.StyledButton>
					채팅 목록 <span>🔴</span>
				</S.StyledButton>
				<S.StyledButton variant={'default-reverse'} state={'ondo'}>
					거래 온도 <S.TempText>{mainData.ondo + '°'}</S.TempText>
				</S.StyledButton>
			</S.ButtonWrapper> */}
			<S.ProgressWrapper>
				<p
					onClick={() => setIsHoverInfo(prev => !prev)}
					onMouseEnter={() => setIsHoverInfo(true)}
					onMouseLeave={() => setIsHoverInfo(false)}
				>
					매너점수 <Info_Icon color={'gray'} />
				</p>
				<S.OndoInfo visible={isHoverInfo}>
					<p>
						매너 점수는 네고마켓 사용자로부터 받은 후기 평점으로 만들어져요.
					</p>
				</S.OndoInfo>
				<S.StartOndoText>
					<p>첫 매너점수 36점</p>
					<Down_Icon />
				</S.StartOndoText>
				<S.OndoText value={mainData.ondo}>{mainData.ondo}점</S.OndoText>
				<ProgressBar value={mainData.ondo} />
			</S.ProgressWrapper>
		</S.Wrapper>
	)
}

export default Profile

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin: 7rem auto;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin: 3rem auto 5rem;
	}
`
const ProfileWrapper = styled.div`
	display: flex;
	margin-bottom: 4rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin-bottom: 6rem;
	}
`
const ProfileImg = styled.img`
	border-radius: 50%;
	width: 7.2rem;
	margin-right: 2rem;
	height: 7.2rem;
`
const ProfileNickName = styled.span`
	${FlexAlignCSS}
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`

const ProgressWrapper = styled.section`
	position: relative;

	& > p {
		width: 10rem;
		${FlexBetweenCSS}
		margin-bottom: 1rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
		cursor: pointer;
	}
`

const StartOndoText = styled.span`
	${FlexCenterCSS}
	flex-direction: column;
	position: absolute;
	left: 36.5rem;
	top: -1rem;
	color: ${({ theme }) => theme.COLOR.common.gray[300]};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		left: 10rem;
		top: -1.5rem;
	}
`

const OndoInfo = styled.div`
	display: ${({ visible }) => (visible ? 'block' : 'none')};
	position: absolute;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	padding: 1rem;
	z-index: 9999;
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	animation: ${FadeInKeyFrame} 0.3s forwards;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`

const OndoText = styled.span`
	position: absolute;
	right: 0;
	top: 1rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	color: ${({ value }) => getOndoToColor(value)};
`

const S = {
	Wrapper,
	ProfileWrapper,
	ProfileImg,
	ProfileNickName,
	ProgressWrapper,
	StartOndoText,
	OndoText,
	OndoInfo,
}
