import { useEffect } from 'react'
import styled from 'styled-components'

const { kakao } = window

function Maps({ detailProduct }) {
	useEffect(() => {
		const container = document.getElementById('myMap')
		const options = {
			center: new kakao.maps.LatLng(0, 0),
			level: 3,
		}
		const map = new kakao.maps.Map(container, options)
		// Geocoder : 주소나 장소명을 좌표로 변환 가능
		const geocoder = new kakao.maps.services.Geocoder()
		geocoder.addressSearch(
			detailProduct?.searchProduct.region,
			(result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					// 검색어 기반 좌표 설정
					const { y: latitude, x: longitude } = result[0]
					const markerPosition = new kakao.maps.LatLng(latitude, longitude)
					// 옵션과 좌표를 기반하여 마커 생성
					const marker = new kakao.maps.Marker({
						position: markerPosition,
					})
					marker.setMap(map)
					map.setCenter(markerPosition)
				}
			},
		)
	}, [])

	return (
		<S.Wrapper>
			<MapTitle>
				<h3>거래 주소 알아보기</h3>
				<span>판매자와 채팅을 통해 상세 주소를 문의하세요</span>
			</MapTitle>
			<div id="myMap"></div>
		</S.Wrapper>
	)
}

export default Maps

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	& > div:last-of-type {
		width: 100%;
		height: 32rem;
		margin-bottom: 6rem;
	}

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 100%;
	}
`

const MapTitle = styled.div`
	margin-bottom: 3rem;

	& > h3 {
		margin-bottom: 1rem;
	}
`

const S = {
	Wrapper,
	MapTitle,
}
