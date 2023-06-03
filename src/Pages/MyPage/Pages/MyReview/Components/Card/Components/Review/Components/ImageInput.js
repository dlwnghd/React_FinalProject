import { useRef } from 'react'
import {
	Outline_Close_Icon,
	Plus_Icon,
} from '../../../../../../../../../Components/Icons/Icons'
import * as S from './style'
import { useState } from 'react'

function ImageInput({ index, imgURL, onChangeImages, onClickRemove }) {
	const input = useRef()
	const [isRemoveIconView, setIsRemoveIconView] = useState(false)

	const onClickAddImage = () => {
		input.current.click()
	}

	const onSetImage = () => {
		const file = input.current.files[0]
		onChangeImages(index, file)
	}

	if (imgURL)
		return (
			<S.ImageBox
				onClick={() => onClickRemove(index)}
				imgURL={imgURL}
				hover={isRemoveIconView}
				onMouseOver={() => setIsRemoveIconView(true)}
				onMouseOut={() => setIsRemoveIconView(false)}
			>
				<span style={{ display: isRemoveIconView ? 'inline-block' : 'none' }}>
					<Outline_Close_Icon size={'3rem'} />
				</span>
			</S.ImageBox>
		)

	return (
		<>
			<S.ImageBox onClick={onClickAddImage}>
				<Plus_Icon size={18} />
			</S.ImageBox>
			<input
				type="file"
				accept="image/jpg, image/jpeg, image/png"
				ref={input}
				onChange={onSetImage}
				style={{ display: 'none' }}
			/>
		</>
	)
}
export default ImageInput
