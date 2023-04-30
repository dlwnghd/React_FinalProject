import { useSetRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../Atoms/modal.atom'
import * as S from './Modal.style'

function Modal(props) {
	const { size, children, ...rest } = props
	const setIsOpenModal = useSetRecoilState(isOpenModalAtom)

	const onClickCloseModal = () => {
		setIsOpenModal(false)
		document.body.style.overflow = 'auto'
	}

	return (
		<S.Wrapper>
			<S.Modal size={size} {...rest}>
				{children}
				<span
					onClick={onClickCloseModal}
					style={{
						position: 'absolute',
						top: '5px',
						right: '5px',
						cursor: 'pointer',
					}}
				>
					X
				</span>
			</S.Modal>
		</S.Wrapper>
	)
}
export default Modal
