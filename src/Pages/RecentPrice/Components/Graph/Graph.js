import React, { useRef, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import { FlexCenterCSS } from '../../../../Styles/common'

function Graph({ filterOption, dummyData }) {
	console.log(filterOption)

	const dateFilter = ['3개월', '6개월', '1년']

	const series = [
		{
			name: '노트북',
			data: dummyData,
		},
	]

	const chartRef = useRef(null)

	useEffect(() => {
		const chart = chartRef.current?.chart

		// filter zoomX 테스트
		if (filterOption === dateFilter[0]) {
			chart.zoomX(
				new Date('2023-02-07').getTime(),
				new Date().getTime(),
			)
		}
		if (filterOption === dateFilter[1]) {
			chart.zoomX(
				new Date('2022-12-07').getTime(),
				new Date().getTime(),
			)
		}
		if (filterOption === dateFilter[2]) {
			chart.zoomX(
				new Date('2022-05-07').getTime(),
				new Date().getTime(),
			)
		}

		// // Reset 테스트
		// chart.resetSeries(false,true)
	}, [filterOption])

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
					return Math.round(val / 1000) * 1000
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
					return Math.round(val / 1000) * 1000
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
				width={300}
				ref={chartRef}
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
