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
	background-color: ${({ theme }) => theme.COLOR.common.black};
`

const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 32rem;
	row-gap: 9rem;
	color: ${({ theme }) => theme.COLOR.common.white};

	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.light};
	}
`

const Logo = styled.h3`
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`

const Description = styled.div`
	& > h2 {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		color: ${({ theme }) => theme.COLOR.main};
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
