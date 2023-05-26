import styled from 'styled-components'
import { useEffect } from 'react'
import { useState } from 'react'
import { DropdownArrow_Icon } from '../../../Components/Icons/Icons'
import { FlexBetweenCSS } from '../../../Styles/common'

function Filter({ filterArray, searchQuote, onFilter, ...rest }) {
	// 배열에 인수가 3개이면 필터 border X

	const [isSelect, setIsSelect] = useState(false)
	const [changeText, setChangeText] = useState(filterArray[0])

	const onSelect = () => {
		setIsSelect(prev => !prev)
	}

	const onChangeText = title => {
		setChangeText(title)
		setIsSelect(prev => !prev)
		onFilter(title)
	}

	useEffect(() => {
		setChangeText(filterArray[0])
	}, [searchQuote])

	return (
		<Wrapper>
			<S.SelectContainer>
				<S.DefaultBox number={filterArray.length} onClick={onSelect}>
					{changeText}
					<DropdownArrow_Icon size="16" />
				</S.DefaultBox>
				{isSelect && (
					<S.SelectList number={filterArray.length}>
						{filterArray.map((title, idx) => {
							return (
								<S.SelectBox
									key={idx}
									onClick={() => onChangeText(title)}
									{...rest}
								>
									{title}
								</S.SelectBox>
							)
						})}
					</S.SelectList>
				)}
			</S.SelectContainer>
		</Wrapper>
	)
}

export default Filter

const Wrapper = styled.div`
	position: relative;
	width: 14rem;
	z-index: 1;
`
const SelectContainer = styled.div`
	width: 100%;
`

const DefaultBox = styled.button`
	position: relative;
	${FlexBetweenCSS};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	padding: 1rem 1.6rem;
	border-radius: 1rem;

	border: ${({ number }) => (number === 3 ? 0 : 0.1)}rem solid
		${({ theme }) => theme.COLOR.common.gray[300]};
	width: 100%;
	background: none;
`

const SelectList = styled.ul`
	position: absolute;
	width: 100%;
	text-align: center;
	border-radius: ${({ number }) => (number <= 3 ? 0 : 1)}rem;
	overflow: hidden;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[300]};
`

const SelectBox = styled.li`
	padding: 1rem 0;
	border-bottom: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[300]};
	background: ${({ theme }) => theme.COLOR.common.white};

	&:last-of-type {
		border-bottom: none;
	}

	&:hover {
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
		background: ${({ theme }) => theme.COLOR.hover};
	}

	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

const S = {
	Wrapper,
	DefaultBox,
	SelectContainer,
	SelectList,
	SelectBox,
}
