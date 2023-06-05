const getEmptyListMessage = path => {
	switch (path) {
		case 'list/freeMarket':
		case 'list/usedTrade':

		case 'mypage-register':
			return {
				title: '등록한 상품이 없습니다.',
				content: '등록하러 가기',
			}
		case 'mypage-interest':
			return {
				title: '찜한 상품이 없습니다.',
				content: '찜하러 가기',
			}
		case 'mypage-review':
			return {
				title: '구매한 상품이 없습니다.',
				content: '구매하러 가기',
			}
		case 'recent-price':
			return {
				title: '최근 거래 종료된 품목이 없습니다.',
				content: '구매하러 가기',
			}
		default:
			return {
				title: '검색 결과가 없습니다.',
				content: '메인으로 가기',
			}
	}
}
export default getEmptyListMessage
