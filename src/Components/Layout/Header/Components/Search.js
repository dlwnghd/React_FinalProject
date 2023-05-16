import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS } from '../../../../Styles/common'
import { Search_Icon } from '../../../Icons/Icons'

function HeaderSearchBar({ setSelectedNav }) {
	const navigate = useNavigate() // 네비게이션 추가
	const [product, setProduct] = useState('') // 검색할 물품 State관리용

	// 검색내용 변경
	const onChangeSearch = e => {
		setProduct(e.target.value)
	}

	/**
	 * Enter 키 입력시 검색 기능
	 */
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onSubmitSearch()
			setSelectedNav(1)
		}
	}

	/**
	 * 검색 기능
	 */
	const onSubmitSearch = () => {
		if (product == '') {
			alert('검색어를 입력해주세요')
			return
		}
		navigate(`/search/${product}`)
	}

	return (
		<S.SearchWrapper>
			<Search_Icon position="absolute" />
			<input
				type="text"
				placeholder={'어떤 상품을 찾으시나요?'}
				onChange={onChangeSearch}
				onKeyDown={handleKeyPress}
				value={product}
			></input>
		</S.SearchWrapper>
	)
}
export default HeaderSearchBar

/**
 * 검색창
 */
const SearchWrapper = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 33.3%;
	${FlexAlignCSS}

	& > input {
		width: 100%;
		height: 4rem;
		color: ${({ theme }) => theme.COLOR.common.black};
		box-sizing: border-box;
		border-radius: 2rem;
		text-indent: 4.4rem;
		background: ${({ theme }) => theme.COLOR.common.white};
		border: 0.1rem solid ${({ theme }) => theme.COLOR.common.gray[300]};
		outline: none;
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	}

	& > svg {
		color: ${({ theme }) => theme.COLOR.common.gray[200]};
		position: absolute;
		left: 1rem;
		font-size: 2.8rem;
	}
`

const S = {
	SearchWrapper,
}
