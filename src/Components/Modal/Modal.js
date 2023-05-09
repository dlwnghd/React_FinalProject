import { useSetRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../Atoms/modal.atom'
import * as S from './Modal.style'
import { ModalClose_icon } from '../Icons/Icons'

function Modal(props) {
	const { size, children, ...rest } = props
	const setIsOpenModal = useSetRecoilState(isOpenModalAtom)

	const onClickCloseModal = () => {
		setIsOpenModal(false)
		document.body.style.overflow = 'auto'
	}

	return (
		<S.Wrapper className="active">
			<S.Modal size={size} {...rest} className="active">
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
					<ModalClose_icon size={22} />
				</span>
			</S.Modal>
		</S.Wrapper>
	)
}
export default Modal
