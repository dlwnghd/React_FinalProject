import { Skeleton } from '@mui/material'
import styled from 'styled-components'

function MainSkeleton() {
	return (
		<S.Wrapper>
			<Skeleton
				sx={{ bgcolor: 'grey.400' }}
				animation="wave"
				variant="rounded"
				width={'100%'}
				height={'27.6rem'}
			/>
			<Skeleton
				style={{ marginTop: '2rem' }}
				sx={{ bgcolor: 'grey.400' }}
				animation="wave"
				variant="rounded"
				width={'100%'}
				height={'2.6rem'}
			/>
			<Skeleton
				style={{ margin: '1rem 0px 2rem' }}
				sx={{ bgcolor: 'grey.400' }}
				animation="wave"
				variant="rounded"
				width={'100%'}
				height={'5rem'}
			/>
			<Skeleton
				sx={{ bgcolor: 'grey.400' }}
				animation="wave"
				variant="rounded"
				width={'100%'}
				height={'2.6rem'}
			/>
		</S.Wrapper>
	)
}
export default MainSkeleton

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: 100%;
`

const S = {
	Wrapper,
}
