import * as S from './style'

function ThisMonth({ clicked, onClick }) {
	return (
		<S.Wrapper>
			<S.MonthButton clicked={clicked} onClick={onClick}>
				이번 달 내역 확인하기
			</S.MonthButton>
		</S.Wrapper>
	)
}
export default ThisMonth
