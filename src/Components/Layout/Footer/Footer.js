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
	/* box-shadow: 0 -0.1rem 1rem; */
	padding: 0 15%;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`

const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 32rem;
	row-gap: 5rem;
`

const Logo = styled.h3`
	color: black;
`

const Description = styled.div`
	color: black;
`

const S = {
	FooterWrapper,
	FooterContainer,
	Logo,
	Description,
}
