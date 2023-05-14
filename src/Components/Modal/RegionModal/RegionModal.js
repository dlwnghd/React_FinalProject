import DaumPostCodeAddress from '../../DaumPostCodeAddress/DaumPostCodeAddress'
import Modal from '../Modal'
import { ModalTitle } from '../Modal.style'

function RegionModal({ setResultAddress, setLatAndLng }) {
	return (
		<Modal size={'large'}>
			<ModalTitle>주소찾기</ModalTitle>
			<DaumPostCodeAddress
				setResultAddress={setResultAddress}
				setLatAndLng={setLatAndLng}
			/>
		</Modal>
	)
}
export default RegionModal
