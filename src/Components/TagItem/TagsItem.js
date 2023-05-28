import * as S from './TagsItem.style'

function TagsItem(props) {
	const {
		size = 'default',
		color = 'default',
		shape = 'default',
		children,
		...rest
	} = props

	return (
		<S.TagItem size={size} color={color} shape={shape} {...rest}>
			{children}
		</S.TagItem>
	)
}
export default TagsItem
