import styled from 'styled-components'
import { useNavigate } from 'react-router'
import Button from '../../../../../Components/Button/Button'
import { FlexAlignCSS, WidthAutoCSS } from '../../../../../Styles/common'

function Profile({ mainData }) {
	const navigate = useNavigate()

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

			<S.ButtonWrapper>
				<S.StyledButton onClick={() => navigate('/mypage/useredit-userinfo')}>
					내 정보 설정
				</S.StyledButton>
				<S.StyledButton>
					채팅 목록 <span>🔴</span>
				</S.StyledButton>
				<S.StyledButton variant={'default-reverse'} state={'ondo'}>
					거래 온도 <S.TempText>{mainData.ondo + '°'}</S.TempText>
				</S.StyledButton>
			</S.ButtonWrapper>
		</S.Wrapper>
	)
}

export default Profile

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin: 7rem auto;
`
const ProfileWrapper = styled.div`
	display: flex;
	margin-bottom: 4rem;
`
const ProfileImg = styled.img`
	border-radius: 50%;
	width: 7.2rem;
	margin-right: 2rem;
`
const ProfileNickName = styled.span`
	${FlexAlignCSS}
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`

const ButtonWrapper = styled.div``

const StyledButton = styled(Button)`
	margin-right: 1rem;
	width: 13rem;
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	cursor: ${({ state }) => state === 'ondo' && 'default'};
`

const TempText = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
`

const S = {
	Wrapper,
	ProfileWrapper,
	ProfileImg,
	ProfileNickName,
	ButtonWrapper,
	StyledButton,
	TempText,
}
