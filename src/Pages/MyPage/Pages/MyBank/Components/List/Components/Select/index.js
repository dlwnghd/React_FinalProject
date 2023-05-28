import styled from 'styled-components'
import TypeSelectBox from './Type'
import Calendar from './Calendar'
import { FlexBetweenCSS } from '../../../../../../../../Styles/common'
import Button from '../../../../../../../../Components/Button/Button'
import { useState, useEffect } from 'react'
import getFormattedDate from '../../../../../../../../Utils/getFormattedDate'

function FilterSection({ filter, setFilter, onSearch }) {
	const [category, setCategory] = useState(filter.category)
	const [start, setStart] = useState(filter.start)
	const [end, setEnd] = useState(filter.end)

	const onClickGetBankList = () => {
		// 조회 버튼을 눌렀을 때 일괄적으로 setFilter
		setFilter({ page: 1, category, start, end })
	}

	useEffect(() => {
		onSearch() // refetch
	}, [filter])

	useEffect(() => {
		// 날짜 선택 유효성 체크
		if (start > end) {
			const [year, month] = start.split('-')
			setEnd(getFormattedDate(new Date(year, month, 0), { day: true }))
		}
	}, [start, end])

	return (
		<S.Wrapper>
			<TypeSelectBox category={category} setCategory={setCategory} />
			<Calendar type={'start'} date={start} setDate={setStart} />
			<span>~</span>
			<Calendar type={'end'} date={end} setDate={setEnd} />
			<S.StyledButton shape={'soft'} onClick={onClickGetBankList}>
				조회
			</S.StyledButton>
		</S.Wrapper>
	)
}
export default FilterSection

const Wrapper = styled.div`
	${FlexBetweenCSS}
	width: 68rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 47rem;
	}
`
const StyledButton = styled(Button)`
	width: 13rem;
	height: 3.5rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 8rem;
	}
`

const S = { Wrapper, StyledButton }
