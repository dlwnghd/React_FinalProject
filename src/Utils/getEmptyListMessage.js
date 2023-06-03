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
	}
}
export default getEmptyListMessage
