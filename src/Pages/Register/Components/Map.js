import { useEffect } from 'react'

const { kakao } = window

function Map() {
	useEffect(() => {
		let mapContainer = document.getElementById('map') //지도에 표시할 div

		//지도의 옵션 설정
		let mapOption = {
			center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), //지도의 중심좌표
			level: 3, //지도의 확대 레벨
		}

		//지도의 표시할 div와 지도 옵션으로 지도를 생성합니다.
		const map = new kakao.maps.Map(mapContainer, mapOption)

		// 지도를 클릭한 위치에 표출할 마커입니다
		const marker = new kakao.maps.Marker({
			// 지도 중심좌표에 마커를 생성합니다
			position: map.getCenter(),
		})

		marker.setMap(map)
	}, [])

	return (
		<>
			<div id="map" style={{ width: '100%', height: '350px' }}></div>
		</>
	)
}

export default Map
