import { Skeleton } from '@mui/material'
import styled from 'styled-components'
import { FlexAlignCSS, WidthAutoCSS } from '../../../../../Styles/common'
import LoadingSkeleton from '../../../../../Components/Skeleton/Skeleton'

function ProfileSkeleton() {
	return (
		<S.Wrapper>
			<S.Container>
				<Skeleton
					variant="circular"
					sx={{ bgcolor: 'grey.400' }}
					width={'9rem'}
					height={'9rem'}
				/>
				<LoadingSkeleton
					width={'29rem'}
					height={'4rem'}
					style={{ marginLeft: '2rem' }}
				/>
			</S.Container>
			<S.Container>
				<LoadingSkeleton width={'40rem'} height={'7rem'} />
			</S.Container>
			<S.Container>
				<LoadingSkeleton width={'100%'} height={'50vh'} />
			</S.Container>
		</S.Wrapper>
	)
}
export default ProfileSkeleton

const Wrapper = styled.div`
	${WidthAutoCSS}
	margin: 7rem auto;
`

const Container = styled.div`
	${FlexAlignCSS}
	margin-bottom: 3rem;
`

const S = {
	Wrapper,
	Container,
}
