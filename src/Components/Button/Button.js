import * as S from './Button.style'

function Button(props) {
	const {
		variant = 'default',
		shape = 'default',
		size = 'default',
		fontSize = 'default',
		fullWidth = false,
		children,
		...rest
	} = props

	return (
		<S.Button
			variant={variant}
			shape={shape}
			size={size}
			fontSize={fontSize}
			fullWidth={fullWidth}
			disabled={!!rest.disabled}
			{...rest}
		>
			{children}
		</S.Button>
	)
}
export default Button
