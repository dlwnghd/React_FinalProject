import DaumPostcode from 'react-daum-postcode'
import styled from 'styled-components'
import { FlexCenterCSS } from '../../../Styles/common'
import { useSetRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../Atoms/modal.atom'

function GPS() {
	const setIsOpenModal = useSetRecoilState(isOpenModalAtom)

	//일단 지번으로 가져오고
	const gpsSelect = data => {
		console.log(data)
		setIsOpenModal(false)
	}

	const postCodeStyle = {
		width: '600px',
		height: '500px',
	}

	return (
		<S.Wrapper>
			<DaumPostcode style={postCodeStyle} onComplete={gpsSelect} autoClose />
		</S.Wrapper>
	)
}
export default GPS

const Wrapper = styled.div`
	${FlexCenterCSS}
	padding-top: 20px;
`
const S = { Wrapper }
