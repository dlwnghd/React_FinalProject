import React, { useEffect } from 'react'

const { kakao } = window

function OrdinaryMap({ LatAndLng, width, height }) {
	if (!LatAndLng) return

	const { x, y } = LatAndLng

	useEffect(() => {
		const container = document.getElementById('map')
		const options = {
			center: new kakao.maps.LatLng(x, y),
			disableDoubleClickZoom: true, // 더블 클릭 금지
			scrollwheel: false, // 스크롤 휠 금지
			draggable: false, // 드래그 금지
			zoomable: false, // 줌 버튼 비활성화
		}
		const kakaoMap = new kakao.maps.Map(container, options)
	}, [LatAndLng])

	return <div id="map" style={{ width, height }}></div>
}
export default OrdinaryMap
