import DaumPostcode from 'react-daum-postcode'
import styled from 'styled-components'

import { useSetRecoilState } from 'recoil'

import { FlexCenterCSS } from '../../Styles/common'
import { isOpenModalAtom } from '../../Atoms/modal.atom'

function DaumPostCodeAddress({ setResultAddress }) {
	const setIsOpenModal = useSetRecoilState(isOpenModalAtom)

	const gpsSelect = data => {
		setIsOpenModal(false)
		let ResultAddress = data.sido + ' ' + data.sigungu + ' ' + data.bname
		setResultAddress(ResultAddress)
		document.body.style.overflow = 'auto'
	}

	return (
		<Wrapper>
			<DaumPostcode onComplete={gpsSelect} autoClose />
		</Wrapper>
	)
}
export default DaumPostCodeAddress

const Wrapper = styled.div`
	${FlexCenterCSS}
	padding-top: 20px;
`
