import DaumPostcode from 'react-daum-postcode'
import styled from 'styled-components'

import { useSetRecoilState } from 'recoil'

import { FlexCenterCSS } from '../../Styles/common'
import { isOpenModalAtom } from '../../Atoms/modal.atom'
import axios from 'axios'

function DaumPostCodeAddress({ setResultAddress, setLatAndLng }) {
	const setIsOpenModal = useSetRecoilState(isOpenModalAtom)

	const gpsSelect = async data => {
		setIsOpenModal(false)
		let ResultAddress = data.sido + ' ' + data.sigungu + ' ' + data.bname
		setResultAddress(ResultAddress)
		document.body.style.overflow = 'auto'

		const searchTxt = data.address
		const config = {
			method: 'get',
			url:
				'https://dapi.kakao.com/v2/local/search/address.json?query=' +
				searchTxt,
			headers: {
				Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI}`,
			},
		}
		try {
			const res = await axios(config)
			if (res.data !== undefined || res.data !== null) {
				if (res.data.documents[0].x && res.data.documents[0].y) {
					setLatAndLng({
						x: res.data.documents[0].x,
						y: res.data.documents[0].y,
					})
				}
			}
		} catch (err) {}
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
