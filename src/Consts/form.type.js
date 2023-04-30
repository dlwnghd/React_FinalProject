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
		message: '영문자와 숫자를 포함해서 입력해주세요',
	},
}

export const FORM_TYPE = {
	EMAIL_TYPE,
	PASSWORD_TYPE,
}
