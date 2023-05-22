import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
	PaginationArrowDouble_Icon,
	PaginationArrowSingle_Icon,
} from '../Icons/Icons'

/**
 * @param total - 전체 물품 수
 * @param limit - 몇개씩 볼것인가
 * @param page - 현재페이지
 * @사용예시 - `<Pagination total={300} page={2} />`
 */

function Pagination({ total, limit, page }) {
	const numPages = Math.ceil(total / limit)

	const startPage = Math.floor((page - 1) / 10) * 10 + 1 // 시작페이지번호
	let endPage = startPage + 10 - 1 // 끝 페이지 번호
	if (endPage >= numPages) endPage = numPages // 끝 페이지 번호 수정용

	const navigate = useNavigate() // url 경로 이동용 내비게이션

	function createArray(start, end) {
		var arr = []
		for (var i = start; i <= end; i++) {
			arr.push(i)
		}
		return arr
	}

	// 페이지네이션 이동 관련 코드 <= 추후 페이지네이션에 맞게 수정하면 됨
	const currentLocation = useLocation()
		.pathname.split('/')
		.slice(0, 3)
		.join('/')

	const setPage = number => {
		navigate(`${currentLocation}/${number}/${limit}`)
	}

	return (
		<>
			<Nav>
				<Button onClick={() => setPage(1)} disabled={Number(page) === 1}>
					<PaginationArrowDouble_Icon rotate={180} />
				</Button>
				<Button onClick={() => setPage(page - 1)} disabled={Number(page) === 1}>
					<PaginationArrowSingle_Icon rotate={180} />
				</Button>
				{createArray(startPage, endPage)
					.fill()
					.map((_, i) => (
						<Button
							key={i + startPage}
							id={i + 1}
							onClick={() => setPage(i + startPage)}
							aria-current={Number(page) === i + startPage ? 'page' : null}
						>
							{i + startPage}
						</Button>
					))}
				<Button
					onClick={() => setPage(Number(page) + 1)}
					disabled={Number(page) === numPages}
				>
					<PaginationArrowSingle_Icon />
				</Button>
				<Button
					onClick={() => setPage(numPages)}
					disabled={Number(page) === numPages}
				>
					<PaginationArrowDouble_Icon />
				</Button>
			</Nav>
		</>
	)
}

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	margin: 16px;
`

const Button = styled.button`
	border: none;
	border-radius: 8px;
	padding: 8px;
	margin: 0;
	background: black;
	color: white;
	font-size: 1rem;

	&:hover {
		background-color: ${({ theme }) => theme.COLOR.hover};
		cursor: pointer;
		transform: translateY(-2px);
	}

	&[disabled] {
		background: grey;
		cursor: revert;
		transform: revert;
	}

	&[aria-current] {
		background-color: ${({ theme }) => theme.COLOR.main};
		font-weight: bold;
		cursor: revert;
		transform: revert;
	}
`

export default Pagination
