const getErrorMessage = status => {
	switch (status) {
		case 403:
			return {
				title: '세션이 만료되었습니다.',
				content: '로그인을 해주세요',
			}
		case 409:
		case 500:
		default:
			return {
				title: '서비스에 접속할 수 없습니다.',
				content: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
			}
	}
}
export default getErrorMessage
