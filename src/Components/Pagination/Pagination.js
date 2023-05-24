import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { PaginationArrowSingle_Icon } from '../Icons/Icons'
import { FlexCenterCSS } from '../../Styles/common'
import scrollToTop from '../../Utils/scrollToTop'

/**
 * @param total - 전체 물품 수
 * @param limit - 페이지네이션 몇 개씩 할 것인지
 * @param perPageItemCount - 한 페이지의 아이템 갯수
 * @param setPage - page 관련 state를 변경시키는 로직의 함수
 * @param scroll - 페이지네이션 클릭 시 이동될 위치
 * @사용예시 - `<Pagination total={300} page={2} />`
 */

/*
	setPage는 page의 state를 변경시키는 함수이고,
	goPage는 쿼리 스트링만을 변경시키는 함수입니다.
*/
function Pagination({ total, limit, perPageItemCount, setPage, scroll }) {
	const [searchParams, setSearchParams] = useSearchParams()

	const nowPage = parseInt(searchParams.get('page')) || 1
	const numPages = Math.ceil(total / perPageItemCount)

	const startPage = Math.floor((nowPage - 1) / limit) * limit + 1 // 시작페이지번호
	let endPage = startPage + limit - 1 // 끝 페이지 번호
	if (endPage >= numPages) endPage = numPages // 끝 페이지 번호 수정용

	const createArray = (start, end) => {
		return Array(end - start + 1)
			.fill()
			.map((_, i) => start + i)
	}

	const goPage = number => {
		setPage(number)
		// 기존 쿼리 스트링을 유지
		const queryString = {}
		searchParams
			.toString()
			.split('&')
			.forEach(query => {
				const [key, value] = query.split('=')
				queryString[key] = value
			})

		queryString['page'] = number // 쿼리 스트링 값 중 'page'만 변경
		setSearchParams(queryString)
	}

	const isDisabled = type => {
		switch (type) {
			case 'start':
				return Math.floor((nowPage - 1) / limit) === 0
			case 'end':
				return Math.ceil(nowPage / limit) === Math.ceil(numPages / limit)
		}
	}

	if (!total) return // total이 0으로 온 경우 아무 것도 return X

	return (
		<S.Nav>
			<S.Button
				onClick={() => {
					goPage(Math.floor(nowPage / limit) * limit)
					scrollToTop(scroll)
				}}
				disabled={isDisabled('start')}
			>
				<PaginationArrowSingle_Icon rotate={180} />
			</S.Button>
			{createArray(startPage, endPage).map((_, i) => (
				<S.NumBtn
					key={i}
					onClick={() => {
						goPage(i + startPage)
						scrollToTop(scroll)
					}}
					aria-current={nowPage === i + startPage ? 'page' : null}
				>
					{i + startPage}
				</S.NumBtn>
			))}
			<S.Button
				onClick={() => {
					goPage(Math.ceil(nowPage / limit) * limit + 1)
					scrollToTop(scroll)
				}}
				disabled={isDisabled('end')}
			>
				<PaginationArrowSingle_Icon />
			</S.Button>
		</S.Nav>
	)
}

const Nav = styled.nav`
	${FlexCenterCSS}
	gap: 4px;
	margin-top: 4rem;
`

const Button = styled.button`
	padding: 0.4rem;
	margin: 0 0.2rem;
	font-size: 1.2rem;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	background-color: ${({ theme }) => theme.COLOR.common.white};

	&:hover {
		background-color: ${({ theme }) => theme.COLOR.hover};
		transition: all 0.2s ease-in-out;
		cursor: pointer;
	}

	&[disabled] {
		background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
		cursor: revert;
		transform: revert;
	}
`

const NumBtn = styled.button`
	margin: 0 1rem;
	border: none;
	font-size: 1.3rem;
	background-color: ${({ theme }) => theme.COLOR.common.white};
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.COLOR.main};
		border-bottom: 1px solid ${({ theme }) => theme.COLOR.main};
	}

	&[aria-current] {
		color: ${({ theme }) => theme.COLOR.main};
		font-weight: bold;
		cursor: revert;
		transform: revert;
	}
`

const S = {
	Nav,
	Button,
	NumBtn,
}

export default Pagination
