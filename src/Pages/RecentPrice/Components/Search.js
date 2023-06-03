import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import useInput from '../../../Hooks/useInput'

function RecentSearch({ setSearchQuote }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchQuote, onChange] = useInput(searchParams.get('quote'))

	const onEnterSearch = event => {
		if (event.key === 'Enter') {
			setSearchQuote(searchQuote)

			searchParams.set('quote', searchQuote)
			setSearchParams(searchParams)
			event.target.blur() // 커서 제거
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
					value={searchQuote}
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
	width: 85%;
	display: flex;
	flex-direction: column;
	margin-top: 3rem;
	justify-content: center;
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
		top: 60%;
		left: 1rem;
		transform: translate(0, -50%);
	}
`
const Input = styled.input`
	border-radius: 3rem;
	width: 30rem;
	height: 3rem;
	padding-left: 3rem;
	margin-top: 1rem;
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
