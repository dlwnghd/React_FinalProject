import styled from 'styled-components'
import { WidthAutoCSS } from '../../../../Styles/common'
import { FaSearch } from 'react-icons/fa'
import useInput from '../../../../Hooks/useInput'

function RecentSearch({ onSearchPrd }) {
	const [search, onChange] = useInput('')

	const onEnterSearch = event => {
		if (event.key === 'Enter') {
			onSearchPrd(search)
		}
	}

	return (
		<S.SearchWrapper>
			<S.TitleBox>
				<S.Title>최근 시세 동향</S.Title>
			</S.TitleBox>
			<S.InputBox>
				<Input
					placeholder="어떤 상품의 시세가 궁금하신가요?"
					value={search}
					onChange={onChange}
					onKeyDown={onEnterSearch}
				/>
				<FaSearch />
			</S.InputBox>
		</S.SearchWrapper>
	)
}

export default RecentSearch

const SearchWrapper = styled.div`
	${WidthAutoCSS}
	display: flex;
	flex-direction: column;
	margin-top: 3rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
`
const TitleBox = styled.div``
const Title = styled.span`
	font-size: ${({ theme }) => theme.FONT_SIZE.large};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`
const InputBox = styled.div`
	position: relative;
	& > svg {
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translate(0, -50%);
	}
`
const Input = styled.input`
	border-radius: 3rem;
	width: 30rem;
	height: 3rem;
	padding-left: 3rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	:focus {
		border-color: ${({ theme }) => theme.COLOR.focus};
		outline: none;
	}
`

const S = {
	SearchWrapper,
	Title,
	InputBox,
	TitleBox,
}
