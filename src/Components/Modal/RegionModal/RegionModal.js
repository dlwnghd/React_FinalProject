import DaumPostCodeAddress from '../../DaumPostCodeAddress/DaumPostCodeAddress'
import Modal from '../Modal'
import { ModalTitle } from '../Modal.style'

function RegionModal({ setRegion }) {
	return (
		<Modal size={'large'}>
			<ModalTitle>주소찾기</ModalTitle>
			<DaumPostCodeAddress setResultAddress={setRegion} />
		</Modal>
	)
}
export default RegionModal
