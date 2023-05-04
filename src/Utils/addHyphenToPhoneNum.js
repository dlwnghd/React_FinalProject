const addHyphenToPhoneNum = phoneNum => {
	// 숫자 이외의 모든 문자 제거
	const trimmedNumber = phoneNum?.replace(/[^0-9]/g, '')

	// 전화번호가 11자리 이상이면 뒷자리 4자리는 모두 묶어서 "-"로 구분
	if (trimmedNumber?.length >= 11) {
		return trimmedNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
	}

	// 그 외에는 앞자리 3자리와 뒷자리를 "-"로 구분
	return trimmedNumber?.replace(/(\d{3})(\d{0,4})?(\d{0,4})?/, '$1-$2$3')
}

export default addHyphenToPhoneNum
