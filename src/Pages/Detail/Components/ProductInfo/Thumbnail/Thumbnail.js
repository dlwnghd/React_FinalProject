import styled from 'styled-components'

function PrdThumbnail() {
	return (
		<ThumbnailWrapper>
			<MainThumBox>
				<img></img>
			</MainThumBox>
			<SubThumBox>
				<div>
					<img></img>
				</div>
				<div>
					<img></img>
				</div>
				<div>
					<img></img>
				</div>
				<div>
					<img></img>
				</div>
				<div>
					<img></img>
				</div>
			</SubThumBox>
		</ThumbnailWrapper>
	)
}

export default PrdThumbnail

const ThumbnailWrapper = styled.section`
	display: flex;
	flex-direction: row;
	gap: 1rem;

	@media screen and (max-width: 1024px) {
		flex-direction: column;
	}
`
const MainThumBox = styled.div`
	height: 100%;
	& > img {
		width: 480px;
		height: 480px;
		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			width: 390px;
			height: 390px;
		}
	}
`
const SubThumBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	height: 100%;
	@media screen and (max-width: 1024px) {
		flex-direction: row;
	}
	& > div {
		width: 92px;
		height: 92px;

		:hover {
			cursor: pointer;
		}
		& > img {
			width: 100%;
			height: 100%;
		}
	}
`
