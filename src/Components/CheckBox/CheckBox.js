import { forwardRef } from 'react'
import * as S from './CheckBox.style'

function CheckBox(props, ref) {
	const {
		size = 'default',
		color = 'default',
		shape = 'default',
		...rest
	} = props
	return (
		<S.CheckBox size={size} color={color} shape={shape}>
			<input type="checkbox" ref={ref} {...rest} />
		</S.CheckBox>
	)
}

export default forwardRef(CheckBox)
