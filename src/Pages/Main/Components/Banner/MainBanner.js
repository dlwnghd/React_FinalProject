import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import productsMock from '../../../../__mock__/Data/Product/product.data'
import Pagination from './Components/Pagination'
import { slide } from '../../../../Utils/slide'

const bannerList = [
	{
		title: '네고마켓 서비스 OPEN',
		subTitle: '오늘은 내가 협상의 달인',
		description: '일요일은 내가 협상의 요리사',
		imgUrl:
			'/assets/img/nego001_banner_230516/Banner_Index01_Layer001_230516_ver.black.svg',
		logo: '/assets/img/nego_symbol_230516_ver1.0_white.svg',
	},

	{
		title: '네고마켓은 다이써',
		subTitle: '여기, 너가 원하던 게 다이소 !',
		description: '내가 거래해본 것 중에 제일 저렴했다 !',
		imgUrl:
			'/assets/img/nego001_banner_230516/Banner_Index01_Layer001_230516_ver.white.svg',
		logo: '/assets/img/nego_symbol_230516_ver1.0_black.svg',
	},
	{
		title: '작은 것에서 부터 무료나눔',
		subTitle: 'FREE MARKET',
		description: '나의 한 발자국이 너를 이롭게',
		imgUrl:
			'/assets/img/nego001_banner_230516/Banner_Index01_Layer001_230516_ver.black.svg',
		logo: '/assets/img/nego_symbol_230516_ver1.0_white.svg',
	},
	{
		title: '내 신을 올렸다, 새 신이 되었다.',
		subTitle: '하루만에... 신던 신발이 바꼈다 ?!',
		description: '이제 신발은 돈주고 사지 말기',
		imgUrl:
			'/assets/img/nego001_banner_230516/Banner_Index02_Layer001_230516_ver.white.svg',
		logo: '/assets/img/nego_symbol_230516_ver1.0_black.svg',
	},
]

function MainBanner() {
	const {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		slider,
		currentIdx,
	} = slide(productsMock.slice(0, 4))

	return (
		<S.Wrapper>
			<S.SlideList
				ref={slider}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
			>
				{bannerList.map(bnr => {
					return (
						<S.SlideBox posterIMG={bnr.imgUrl} logoIMG={bnr.logo}>
							<div>
								<p>{bnr.subTitle}</p>
								<h2>{bnr.title}</h2>
							</div>
							<span>{bnr.description}</span>
						</S.SlideBox>
					)
				})}
			</S.SlideList>
			<Pagination currentIdx={currentIdx} />
		</S.Wrapper>
	)
}

export default MainBanner

const Wrapper = styled.section`
	position: relative;
	height: 36rem;
	overflow: hidden;
	box-sizing: border-box;
	border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[100]};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		height: 55rem;
	}
`

const SlideList = styled.ul`
	transition: 0.5s ease-in-out;
	${FlexAlignCSS}
	height: 100%;
`
const SlideBox = styled.li`
	position: relative;
	background: ${({ logoIMG, theme }) =>
		logoIMG.includes('white')
			? theme.COLOR.common.black
			: theme.COLOR.common.white};
	color: ${({ logoIMG, theme }) =>
		logoIMG.includes('white')
			? theme.COLOR.common.white
			: theme.COLOR.common.black};
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	padding: 6rem;

	// 심볼 로고
	&::before {
		position: absolute;
		top: 2rem;
		left: 2rem;
		z-index: 1;
		content: '';
		width: 4rem;
		height: 4rem;
	}

	&::before {
		z-index: 3;
		background: ${({ logoIMG }) => `url(${logoIMG})`} no-repeat center center;
		background-size: cover;
	}

	// 빼다 이미지
	&::after {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 1;
		content: '';
		height: 100%;
	}

	&::after {
		right: 0;
		padding-right: 50%;
		background: ${({ posterIMG }) => `url(${posterIMG})`} no-repeat center
			center;
		background-size: ${({ posterIMG }) =>
			posterIMG.includes('black') ? 'cover' : 'contain'};

		@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
			opacity: 0.3;
			padding-right: 100%;
		}
	}

	& > div {
		margin-bottom: 4rem;
		position: relative;
		z-index: 2;
	}

	& > div ~ span {
		position: relative;
		z-index: 2;
	}

	& > div > h2 {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		margin-top: 1rem;
	}

	& > div > p {
		color: ${({ theme }) => theme.COLOR.main};
	}
`

const S = {
	Wrapper,
	SlideList,
	SlideBox,
}
