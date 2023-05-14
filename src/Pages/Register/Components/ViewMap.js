import { useEffect } from 'react'

const { kakao } = window

function ViewMap({ LatAndLng }) {
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

	return (
		<>
			{LatAndLng && (
				<div id="map" style={{ width: '100%', height: '350px' }}></div>
			)}
		</>
	)
}

export default ViewMap
