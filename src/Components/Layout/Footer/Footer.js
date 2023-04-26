import styled from 'styled-components'
import TopButton from './TopButton/TopButton'

function Footer() {
	return (
		<S.FooterWrapper>
			<S.FooterContainer>
				<TopButton />
				<S.Description>
					<S.Logo>WELCOME TO</S.Logo>
					<h2>NEGO MARKET</h2>
				</S.Description>
				<p>Copyright by Team. Nego</p>
			</S.FooterContainer>
		</S.FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	box-sizing: border-box;
	padding: 0 15%;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};

	@media screen and (max-width: 440px) {
		display: none;
	}
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

const S = {
	FooterWrapper,
	FooterContainer,
	Logo,
	Description,
}
