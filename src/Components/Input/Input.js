import { forwardRef } from 'react'
import * as S from './Input.style'

function Input({ status = 'default', ...rest }, ref) {
	return <S.Input status={status} ref={ref} {...rest} />
}
export default forwardRef(Input)
