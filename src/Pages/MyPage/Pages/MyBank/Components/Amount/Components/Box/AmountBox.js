import {
	Dollar_Icon,
	Shopping_Icon,
} from '../../../../../../../../Components/Icons/Icons'
import * as S from './style'

const TITLEITEM = {
	sale: {
		TITLE: '총 판매 금액',
		COLOR: '#EDF4FE',
		ICON: <Dollar_Icon size={22} color={'#3168CD'} />,
	},
	purchase: {
		TITLE: '총 구매 금액',
		COLOR: '#ffedeb',
		ICON: <Shopping_Icon size={22} color={'#EE7B6A'} />,
	},
}

function AmountItemBox({ title, price }) {
	const item = TITLEITEM[title]

	return (
		<S.Wrapper>
			<S.Container>
				<S.TitleContainer>
					<S.IconBox colorCode={item.COLOR}>{item.ICON}</S.IconBox>
					<S.Title>{item.TITLE}</S.Title>
				</S.TitleContainer>
				<S.PriceContainer>
					<S.PriceText size={'small'}>
						{parseInt(price).toLocaleString()}
					</S.PriceText>
				</S.PriceContainer>
			</S.Container>
		</S.Wrapper>
	)
}
export default AmountItemBox
