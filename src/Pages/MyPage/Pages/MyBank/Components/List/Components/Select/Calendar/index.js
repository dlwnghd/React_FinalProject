import React from 'react'
import styled from 'styled-components'
import {
	FlexBetweenCSS,
	FlexCenterCSS,
} from '../../../../../../../../../Styles/common'
import { useState } from 'react'
import {
	Calendar_Icon,
	Left_Arrow_Icon,
	Right_Arrow_Icon,
} from '../../../../../../../../../Components/Icons/Icons'
import getFormattedDate from '../../../../../../../../../Utils/getFormattedDate'
import { useEffect } from 'react'

const monthArr = Array(12)
	.fill(1)
	.map((num, i) => (num += i))

function Calendar({ type, date, setDate }) {
	const [year, month, day] = date.split('-')
	const [isOpenOption, setIsOpenOption] = useState(false)

	// 기본 세팅을 오늘 기준 year, month로 하기 위해
	const today = {
		origin: new Date(),
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
	}

	// select한 year와 month에 해당
	const [selectedDate, setSelectedDate] = useState({
		year,
		month,
		formattedDate: `${year}-${month}`,
	})

	const onClickYear = (year, type) => {
		switch (type) {
			case 'prev':
				setSelectedDate(prev => ({ ...prev, year: parseInt(year) - 1 }))
				break
			case 'next':
				setSelectedDate(prev => ({ ...prev, year: parseInt(year) + 1 }))
				break
		}
	}

	const onClickMonth = month => {
		// month text를 눌렀을 때 결과적으로 선택한 날짜의 텍스트가 변경됩니다.
		setIsOpenOption(false) // selectContainer 닫기
		setDate(
			getFormattedDate(
				new Date(
					selectedDate.year,
					type === 'start' ? month - 1 : month,
					type === 'start' ? 1 : 0,
				),
			),
		)
	}

	useEffect(() => {
		const [year, month, day] = date.split('-')
		setSelectedDate({
			year,
			month,
			formattedDate: `${year}-${month}`,
		})
	}, [date])

	return (
		<S.Wrapper>
			<S.BoxContainer onClick={() => setIsOpenOption(prev => !prev)}>
				<span>{selectedDate.formattedDate}</span>
				<Calendar_Icon size={16} />
			</S.BoxContainer>
			{isOpenOption && (
				<S.SelectContainer state={isOpenOption}>
					<S.SelectHeader>
						<S.ArrowBtn
							type={'prev'}
							onClick={() => onClickYear(selectedDate.year, 'prev')}
						>
							<Left_Arrow_Icon />
						</S.ArrowBtn>
						<span>{selectedDate.year}년</span>
						<S.ArrowBtn
							type={'next'}
							disabled={today.year === parseInt(selectedDate.year)}
							onClick={() => onClickYear(selectedDate.year, 'next')}
						>
							<Right_Arrow_Icon />
						</S.ArrowBtn>
					</S.SelectHeader>
					{monthArr.map(mon => (
						<S.SelectItem
							key={mon}
							state={
								mon === parseInt(selectedDate.month) &&
								parseInt(year) === parseInt(selectedDate.year)
							}
							disabled={
								today.year === parseInt(selectedDate.year) && mon > today.month
							}
							onClick={() => onClickMonth(mon)}
						>
							{mon}월
						</S.SelectItem>
					))}
				</S.SelectContainer>
			)}
		</S.Wrapper>
	)
}
export default Calendar

const Wrapper = styled.div`
	${FlexBetweenCSS}
	position: relative;
	width: 18rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 11.5rem;
	}
`

const BoxContainer = styled.div`
	${FlexBetweenCSS}
	width: 100%;
	height: 3.5rem;
	padding: 0 1.3rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 0.5rem;
	cursor: pointer;

	& > span {
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}
`

const SelectContainer = styled.ul`
	display: ${({ state }) => (state ? 'grid' : 'none')};
	position: absolute;
	z-index: 9999;
	top: 3.5rem;
	width: 100%;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	border-radius: 0.5rem;
	margin-top: 0.8rem;
	justify-content: center;
	align-items: center;
	grid-template-columns: repeat(3, 1fr);

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${FlexCenterCSS}
		flex-direction: column;
	}
`

const SelectHeader = styled.div`
	width: 90%;
	line-height: 3rem;
	margin: 0 auto 0.5rem;
	${FlexBetweenCSS}
	grid-column: 1 / -1;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
`

const ArrowBtn = styled.button`
	background-color: ${({ theme }) => theme.COLOR.common.white};
	pointer-events: ${({ type, disabled }) =>
		type === 'next' && disabled ? 'none' : 'auto'};
`

const SelectItem = styled.li`
	width: 100%;
	text-align: center;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	border-radius: 0.5rem;
	padding: 0.5rem 0.8rem;
	opacity: ${({ disabled }) => disabled && '0.3'};
	background-color: ${({ theme, state }) =>
		state ? `${theme.COLOR.main}` : `${theme.COLOR.common.white}`};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	cursor: pointer;

	&:hover {
		background-color: ${({ theme, state }) =>
			!state && theme.COLOR.common.gray[100]};
	}
`

const S = {
	Wrapper,
	BoxContainer,
	SelectContainer,
	SelectHeader,
	ArrowBtn,
	SelectItem,
}
