import * as S from './AlertText.style'

function AlertText(props) {
	const { children, type = 'default', size = 'default', ...rest } = props
	return (
		<S.AlertText type={type} size={size} {...rest}>
			{children}
		</S.AlertText>
	)
}
export default AlertText
