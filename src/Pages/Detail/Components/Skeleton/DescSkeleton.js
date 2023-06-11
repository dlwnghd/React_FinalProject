import styled from 'styled-components'
import LoadingSkeleton from '../../../../Components/Skeleton/Skeleton'

function DescSkeleton() {
	return (
		<S.Wrapper>
			<div>
				<LoadingSkeleton width={'100%'} height={'3rem'} />
				<LoadingSkeleton width={'18rem'} height={'3rem'} />
			</div>
			<LoadingSkeleton width={'24rem'} height={'4rem'} />
			<div>
				<LoadingSkeleton width={'50%'} height={'6rem'} />
				<LoadingSkeleton width={'50%'} height={'6rem'} />
			</div>
			<hr />
			<LoadingSkeleton width={'14rem'} height={'3rem'} />
			<LoadingSkeleton width={'18rem'} height={'3rem'} />
		</S.Wrapper>
	)
}

export default DescSkeleton

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	& span {
		margin-bottom: 1rem;
	}

	& > div:nth-of-type(2) {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	& > div:nth-of-type(2) > span {
		margin: 0;
	}

	& > hr {
		margin: -4rem 0;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		& > hr {
			margin: 4rem 0;
		}
	}
`

const S = {
	Wrapper,
}
