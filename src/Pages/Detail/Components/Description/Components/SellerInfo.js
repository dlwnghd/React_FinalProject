import styled from 'styled-components'
import { FlexCenterCSS } from '../../../../../Styles/common'

function SellerInfo({ User }) {
	const { Ondo, nick_name, profile_url } = User

	return (
		<S.Wrapper>
			<S.ProfileContainer>
				{/* 프로필 박스 클릭시, 판매 목록 마운트 ? */}
				<S.ProfileBox profileIMG={profile_url}></S.ProfileBox>
				<div>
					<p>닉네임 : {nick_name}</p>
					<span>매너 점수 : {Ondo.ondo}점</span>
				</div>
			</S.ProfileContainer>
		</S.Wrapper>
	)
}

export default SellerInfo

const Wrapper = styled.div`
	margin-bottom: 2rem;
`

const ProfileContainer = styled.div`
	${FlexCenterCSS}

	& > div:last-of-type {
		margin-left: 1rem;
	}
`

const ProfileBox = styled.div`
	width: 5rem;
	height: 5rem;
	border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 2.5rem;
	background: ${({ profileIMG }) => `url(${profileIMG})`} no-repeat center
		center;
	background-size: cover;
`

const S = {
	Wrapper,
	ProfileContainer,
	ProfileBox,
}
