import { useEffect } from 'react'

const { kakao } = window

function ViewMap({ addressInfo }) {
	useEffect(() => {
		const { x, y } = addressInfo
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
	}, [addressInfo])

	return (
		<>
			<div id="map" style={{ width: '100%', height: '350px' }}></div>
		</>
	)
}

export default ViewMap
