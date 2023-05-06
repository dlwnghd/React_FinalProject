import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import { FlexCenterCSS } from '../../../../Styles/common'

function Graph({ filterOption, dummyData }) {
	console.log(filterOption)

	const series = [
		{
			name: '노트북',
			data: dummyData,
		},
	]

	const options = {
		chart: {
			type: 'area',
			stacked: false,
			height: 350,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true,
			},
			toolbar: {
				autoSelectd: 'zoom',
			},
		},
		dataLabels: {
			enabled: false,
		},
		markers: {
			size: 0,
		},
		title: {
			text: '시세동향',
			align: 'left',
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.5,
				opacityTo: 0,
				stops: [0, 90, 100],
			},
		},
		theme: {
			mode: 'dark',
		},
		yaxis: {
			labels: {
				formatter: function (val) {
					return val.toFixed(0)
				},
			},
			title: {
				text: '가격',
			},
		},
		xaxis: {
			type: 'datetime',
		},
		tooltip: {
			shared: false,
			y: {
				formatter: function (val) {
					return val.toFixed(3)
				},
			},
		},
	}

	return (
		<GraphBox>
			<ReactApexChart
				options={options}
				series={series}
				height={500}
				type="area"
				width={900}
			/>
		</GraphBox>
	)
}

export default Graph

const GraphBox = styled.div`
	${FlexCenterCSS}

	@media screen and(max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		& > div {
			width: 350px;
		}
	}
`
