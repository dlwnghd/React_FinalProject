import styled from 'styled-components'
import { WidthAutoCSS } from '../../../Styles/common'
import AddProductButton from './Components/AddProductButton'
import MobileFooter from './Components/MobileFooter'
// import TopButton from './Components/TopButton'

function Footer() {
	return (
		<S.FooterWrapper>
			<S.FooterContainer>
				<S.FooterContent>
					{/* <TopButton /> */}
					<S.DescriptionBox>
						<S.Logo>WELCOME TO</S.Logo>
						<h2>NEGO MARKET</h2>
					</S.DescriptionBox>
					<p>Copyright by Team. Nego</p>
				</S.FooterContent>
			</S.FooterContainer>
			<AddProductButton />
			<MobileFooter />
		</S.FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	border-top: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[100]};
	position: relative;
	z-index: 999;
	box-sizing: border-box;
	background-color: ${({ theme }) => theme.COLOR.common.white};
`

const FooterContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 32rem;
	row-gap: 9rem;
	color: ${({ theme }) => theme.COLOR.common.black};

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.light};
	}
`

const Logo = styled.h3`
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`

const DescriptionBox = styled.div`
	& > h2 {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const FooterContainer = styled.div`
	${WidthAutoCSS};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: none;
	}
`

const S = {
	FooterWrapper,
	FooterContent,
	Logo,
	DescriptionBox,
	FooterContainer,
}
