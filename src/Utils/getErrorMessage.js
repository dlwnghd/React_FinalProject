const getErrorMessage = status => {
	switch (status) {
		case 403:
			return {
				title: '세션이 만료되었습니다.',
				content: '로그인을 해주세요',
			}
		case 409:
		case 500:
			return {
				title: '서버에서 오류가 발생하였습니다.',
				content:
					'잠시 후 다시 시도해주세요. 문제가 지속될 경우 고객 센터에 문의해 주세요.',
			}
		case 502:
			return {
				title: '연결 과정에서 문제가 발생하였습니다.',
				content: '잠시 후 다시 시도해주세요.',
			}
		case 503:
			return {
				title: '서비스를 일시적으로 이용할 수 없습니다.',
				content: '나중에 다시 시도해주세요.',
			}
		default:
			return {
				title: '서비스에 접속할 수 없습니다.',
				content: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
			}
	}
}
export default getErrorMessage
