import styled from 'styled-components'
import { WidthAutoCSS } from '../../../Styles/common'
import MobileFooter from './Components/MobileFooter'
import TopButton from './Components/TopButton'

function Footer() {
	return (
		<S.FooterWrapper>
			<S.FootSize>
				<S.FooterContainer>
					<TopButton />
					<S.Description>
						<S.Logo>WELCOME TO</S.Logo>
						<h2>NEGO MARKET</h2>
					</S.Description>
					<p>Copyright by Team. Nego</p>
				</S.FooterContainer>
			</S.FootSize>
			<MobileFooter />
		</S.FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	position: relative;
	z-index: 999;
	box-sizing: border-box;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`

const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 32rem;
	row-gap: 9rem;

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.light};
	}
`

const Logo = styled.h3`
	color: black;
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`

const Description = styled.div`
	color: black;

	& > h2 {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}
`

const FootSize = styled.div`
	${WidthAutoCSS};

	@media screen and (max-width: 440px) {
		display: none;
	}
`

const S = {
	FooterWrapper,
	FooterContainer,
	Logo,
	Description,
	FootSize,
}
