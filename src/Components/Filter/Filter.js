import styled from 'styled-components'

function Filter(/* filterArray */) {
	// filter Array는 받아올 때부터 option에 사용하는 모든 것을 배열로 전달받는다.
	const filterArray = ['a', 'b']

	return (
		<S.SelectContainer>
			{filterArray.map(title => {
				return <SelectList>{title}</SelectList>
			})}
		</S.SelectContainer>
	)
}

export default Filter

const SelectContainer = styled.select`
	// 필터에 담겨진 글자의 길이가 다르기 때문에 제일 길이가 긴 글자를 기준으로
	// 셀렉트 박스의 width값을 설정 (padding : maxLengthText의 글자크기 * 글자수 / 2 )
	padding: 0 ${({ title }) => title};
	height: 6rem;
	border-radius: 3rem;
`

const SelectList = styled.option`
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`

const S = {
	SelectContainer,
	SelectList,
}
