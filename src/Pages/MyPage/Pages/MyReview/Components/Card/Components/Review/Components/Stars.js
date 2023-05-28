import { useState } from 'react'
import {
	Star_Empty,
	Star_Fill,
} from '../../../../../../../../../Components/Icons/Icons'
import styled from 'styled-components'

const createStarsArray = number => {
	const numberOfTrues = Math.ceil(number / 20)
	return Array.from({ length: 5 }, (_, i) => i < numberOfTrues)
}

function Stars({ config }) {
	const {
		state,
		data: { ondo },
	} = config

	const [stars, setStars] = useState(createStarsArray(ondo))

	const onClickStar = num => {
		if (state === 'read') return

		const newStarArr = Array.from({ length: 5 }, (_, i) => i < num)
		setStars(newStarArr)
	}

	return (
		<S.Wrapper>
			{stars.map((star, i) => (
				<S.Container key={i} state={state} onClick={() => onClickStar(i + 1)}>
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
	cursor: ${({ state }) => (state === 'read' ? 'default' : 'pointer')};
`

const S = { Wrapper, Container }
