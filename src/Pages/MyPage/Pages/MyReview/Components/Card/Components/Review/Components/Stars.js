import { useEffect, useState } from 'react'
import {
	Star_Empty,
	Star_Fill,
} from '../../../../../../../../../Components/Icons/Icons'
import styled from 'styled-components'

const createStarsArray = number => {
	const numberOfTrues = Math.ceil(number / 20)
	return Array.from({ length: 5 }, (_, i) => i < numberOfTrues)
}

const calculateStarValue = array => {
	const trueCount = array.filter(value => value).length
	return trueCount * 20
}

function Stars({ mode, ondo, setNewReview }) {
	const [stars, setStars] = useState(createStarsArray(ondo))

	const onClickStar = num => {
		if (mode === 'read') return

		const newStarArr = Array.from({ length: 5 }, (_, i) => i < num)
		setStars(newStarArr)
	}

	useEffect(() => {
		setNewReview(prev => ({ ...prev, ondo: calculateStarValue(stars) }))
	}, [stars])

	return (
		<S.Wrapper>
			{stars.map((star, i) => (
				<S.Container key={i} mode={mode} onClick={() => onClickStar(i + 1)}>
					{star ? (
						<Star_Fill size={'2.8rem'} />
					) : (
						<Star_Empty size={'2.8rem'} />
					)}
				</S.Container>
			))}
		</S.Wrapper>
	)
}
export default Stars

const Wrapper = styled.div`
	margin-bottom: 1rem;
`

const Container = styled.span`
	cursor: ${({ mode }) => (mode === 'read' ? 'default' : 'pointer')};
`

const S = { Wrapper, Container }
