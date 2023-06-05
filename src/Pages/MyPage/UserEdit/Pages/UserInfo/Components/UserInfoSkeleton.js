import { Skeleton } from '@mui/material'
import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../../../Styles/common'
import LoadingSkeleton from '../../../../../../Components/Skeleton/Skeleton'

function UserInfoSkeleton() {
	return (
		<S.Wrapper>
			<S.Container>
				<Skeleton
					variant="circular"
					sx={{ bgcolor: 'grey.400' }}
					width={'7.2rem'}
					height={'7.2rem'}
				/>
			</S.Container>
			<S.SkeletonContainer>
				<LoadingSkeleton width={'85rem'} height={'38rem'} />
			</S.SkeletonContainer>
		</S.Wrapper>
	)
}
export default UserInfoSkeleton

const Wrapper = styled.div`
	${WidthAutoCSS}
	width: 40%;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 95%;
	}
`
const Container = styled.div`
	height: 8rem;
`
const SkeletonContainer = styled.div`
	margin-bottom: 2rem;
	margin-top: 1rem;
`
const S = {
	Wrapper,
	Container,
	SkeletonContainer,
}
