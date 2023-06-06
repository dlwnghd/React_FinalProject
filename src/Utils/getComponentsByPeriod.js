import React from 'react'

const getComponentsByPeriod = content => {
	const splittedContent = content.split('. ')

	return (
		<>
			{splittedContent.map((sentence, index) => (
				<React.Fragment key={index}>
					{sentence}
					<br />
				</React.Fragment>
			))}
		</>
	)
}
export default getComponentsByPeriod
