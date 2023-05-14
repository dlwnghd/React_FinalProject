import REGEX from './regex'

const EMAIL_TYPE = {
	required: {
		value: true,
		message: '아이디(이메일을)을 입력해주세요',
	},
	pattern: {
		value: REGEX.email,
		message: '이메일 형식에 맞게 입력해주세요',
	},
}

const PASSWORD_TYPE = {
	required: {
		value: true,
		message: '비밀번호를 입력해주세요',
	},
	minLength: {
		value: 8,
		message: '8자 이상 입력해주세요',
	},
	maxLength: {
		value: 16,
		message: '16자 이하로 입력해주세요',
	},
	pattern: {
		value: REGEX.password,
		message: '영문자, 숫자, 특수문자를 포함해서 입력해주세요',
	},
}

const NICKNAME_TYPE = {
	required: {
		value: true,
		message: '닉네임을 입력해주세요',
	},
	minLength: {
		value: 2,
		message: '2자 이상 입력해주세요',
	},
	maxLength: {
		value: 10,
		message: '10자 이하로 입력해주세요',
	},
	pattern: {
		value: REGEX.nickname,
		message: '공백 및 한글 초성이나 모음은 쓸 수 없습니다',
	},
}

const PHONE_TYPE = {
	required: {
		value: true,
		message: '연락처를 입력해주세요',
	},
	pattern: {
		value: REGEX.phone,
		message: '휴대폰 번호를 정확히 입력해주세요',
	},
}

const PRODUCT_TITLE_TYPE = {
	required: {
		value: true,
		message: '상품명을 입력해주세요',
	},
}

const PRODUCT_CATEGORY_TYPE = {
	required: {
		value: true,
		message: '무료나눔 혹은 중고상품 선택해주세요',
	},
}
const PRODUCT_PRICE_TYPE = {
	required: {
		value: true,
		message: '가격을 입력해주세요',
	},
}
const PRODUCT_DESCRIPTION_TYPE = {
	required: {
		value: true,
		message: '상품설명을 입력해주세요',
	},
	maxLength: {
		value: 10000,
		message: '10,000자 이하로 입력해주세요',
	},
}

export const FORM_TYPE = {
	EMAIL_TYPE,
	PASSWORD_TYPE,
	NICKNAME_TYPE,
	PHONE_TYPE,
	PRODUCT_DESCRIPTION_TYPE,
	PRODUCT_TITLE_TYPE,
	PRODUCT_CATEGORY_TYPE,
	PRODUCT_PRICE_TYPE,
}
