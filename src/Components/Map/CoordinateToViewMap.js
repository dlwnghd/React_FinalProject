import { useEffect } from 'react'

const { kakao } = window

function CoordinateToViewMap({ LatAndLng, width, height }) {
	useEffect(() => {
		if (!LatAndLng) return

		const { x, y } = LatAndLng
		let mapContainer = document.getElementById('map')

		let mapOption = {
			center: new kakao.maps.LatLng(y, x),
			level: 6,
		}

		const map = new kakao.maps.Map(mapContainer, mapOption)

		const marker = new kakao.maps.Marker({
			position: map.getCenter(),
		})

		marker.setMap(map)
	}, [LatAndLng])

	if (LatAndLng) return <div id="map" style={{ width, height }}></div>
}

export default CoordinateToViewMap
