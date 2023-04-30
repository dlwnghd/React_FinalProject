import DaumPostcode from 'react-daum-postcode'

function GPS() {
	//일단 지번으로 가져오고,
	const gpsSelect = data => {
		console.log(data)
	}

	const postCodeStyle = {
		// display: 'block',
		// position: 'absolute',
		// top: '20%',
		width: '400px',
		height: '400px',
		// padding: '7px',
		// zIndex: 100,
	}

	return <DaumPostcode style={postCodeStyle} onComplete={gpsSelect} autoClose />
}
export default GPS
