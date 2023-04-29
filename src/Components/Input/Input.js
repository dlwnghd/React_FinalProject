import * as S from './Input.style'

function Input({ status = 'default', ...rest }) {
	return <S.Input status={status} {...rest} />
}
export default Input
