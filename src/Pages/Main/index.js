import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'
import MainBanner from './Components/Banner/MainBanner'
import GridBanner from './Components/Banner/GridBanner'
import SlideBanner from './Components/Banner/SlideBanner'

function Main() {
	return (
		<S.Wrapper>
			<MainBanner />
			<S.Container>
				<GridBanner />
				<S.FreeMarketList>
					<S.Title>FREE MARKET</S.Title>
					{/* 호출된 4 column 2row 데이터 입힌 후, 공용 컴포넌트 ItemBox 재사용 */}
					<S.ProductList>
						<S.ProductBox>
							{/* 이미지 div */}
							<div></div>
							{/* 디스크립션 div */}
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							{/* 하트 div */}
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
					</S.ProductList>
				</S.FreeMarketList>
				<SlideBanner />
				<S.TradeUsedList>
					<S.Title>TRADE USED</S.Title>
					{/* 호출된 4 column 2row 데이터 입힌 후, 공용 컴포넌트 ItemBox 재사용 */}
					<S.ProductList>
						<S.ProductBox>
							{/* 이미지 div */}
							<div></div>
							{/* 디스크립션 div */}
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							{/* 하트 div */}
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
						<S.ProductBox>
							<div></div>
							<div>
								<h4>고양이</h4>
								<h3>247,000원</h3>
								<p>
									덴마크 장인의 손길이 닿은 살아 숨쉬는 네모난 고양이, 갸우뚱
									되는 개성을 지닌 인형
								</p>
							</div>
							<div>♥</div>
						</S.ProductBox>
					</S.ProductList>
				</S.TradeUsedList>
			</S.Container>
		</S.Wrapper>
	)
}

export default Main

const Wrapper = styled.section`
	${WidthAutoCSS}
`

const Container = styled.section`
	margin: 6rem 0;
`

const FreeMarketList = styled.section`
	margin: 12rem 0;
`

const TradeUsedList = styled.section`
	margin: 12rem 0;
`

const Title = styled.h4`
	text-align: center;
`

const ProductList = styled.div`
	margin-top: 4rem;
	${GridCenterCSS}
	${ColumnNumberCSS(4)}

	@media screen and (max-width:${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)}
	}
`

const ProductBox = styled.div`
	position: relative;
	cursor: pointer;

	& > div:first-of-type {
		width: 27.6rem;
		height: 27.6rem;
		background: ${({ theme }) => theme.COLOR.common.gray[100]};

		@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
			width: 100%;
			height: 17.4rem;
		}
	}
	& > div:nth-of-type(2) {
		margin-top: 2rem;

		& > h3 {
			margin: 1rem 0 2rem;
		}
	}
	& > div:last-of-type {
		position: absolute;
		z-index: 3;
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
		cursor: pointer;
		padding: 2rem;
		top: 0;
		right: 0;
	}
`

const S = {
	Wrapper,
	Container,
	FreeMarketList,
	TradeUsedList,
	Title,
	ProductList,
	ProductBox,
}
