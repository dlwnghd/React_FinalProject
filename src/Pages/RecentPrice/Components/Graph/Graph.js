import React, { useRef } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import Filter from '../../../../Components/Filter/Filter'
import { FlexCenterCSS } from '../../../../Styles/common'

function Graph({ dummyData }) {
	const chartRef = useRef(null)
	// Filter 종류
	const dateFilter = ['최근 3개월', '최근 6개월', '최근 1년']
	const filterByMonths = (data, months) => {
		const now = new Date()
		const from = new Date(
			now.getFullYear(),
			now.getMonth() - months,
			now.getDate(),
		)
		return data.filter(item => item.x >= from)
	}
	const defaultData = filterByMonths(dummyData, 3)

	// 필터버튼 클릭시
	const onFilter = e => {
		dateFilter.some(item => {
			if (e.target.innerText == item) {
				updateData(item)
				return true
			}
			return false
		})
	}

	// Series(데이터가 들어가야할 곳!)
	const series = [
		{
			name: '노트북', // 상품명
			data: defaultData, // 데이터가 들어가야할 곳
		},
	]

	// Option
	const options = {
		chart: {
			id: 'area-datetime',
			type: 'area',
			height: 350,
			zoom: {
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
			style: 'hollow',
		},
		title: {
			text: '시세동향',
			align: 'center',
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.7,
				opacityTo: 0.9,
				stops: [0, 100],
			},
		},
		theme: {
			mode: 'dark',
			palette: 'palette1',
			monochrome: {
				enabled: false,
				color: 'black',
				shadeTo: 'light',
				shadeIntensity: 0.65,
			},
		},
		yaxis: {
			labels: {
				formatter: function (val) {
					return Math.round(val / 1000) * 1000
				},
			},
			title: {
				text: '가격',
				rotate: 0,
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: '14px',
					fontWeight: 'bold',
					fontFamily: undefined,
					color: `${({ theme }) => theme.COLOR.main}`,
				},
			},
		},
		xaxis: {
			type: 'datetime',
			tickAmount: 6,
		},
		tooltip: {
			shared: false,
			x: {
				format: 'dd MMM yyyy',
			},
			y: {
				formatter: function (val) {
					return Math.round(val / 1000) * 1000
				},
			},
		},
	}

	// ApexFilter zoom-in, zoom-out 적용
	function updateData(timeline) {
		const chart = chartRef.current.chart

		const today = new Date() // 오늘 날짜

		// Filter되는 날짜 데이터 연산 후 저장
		const dateFilter = {
			'최근 3개월': [
				new Date(
					today.getFullYear(),
					today.getMonth() - 2,
					today.getDate(),
				).getTime(),
				today.getTime(),
			],
			'최근 6개월': [
				new Date(
					today.getFullYear(),
					today.getMonth() - 5,
					today.getDate(),
				).getTime(),
				today.getTime(),
			],
			'최근 1년': [
				new Date(
					today.getFullYear() - 1,
					today.getMonth(),
					today.getDate(),
				).getTime(),
				today.getTime(),
			],
		}

		// ex)  2/8 ~ 5/8 (3개월 전)
		const [start, end] = dateFilter[timeline] || []

		// 전체면 Reset
		// if (timeline === '전체') {
		// 	chart.resetSeries(true, true)
		// 	return
		// }

		// Zoom 조절
		if (start && end) {
			return ApexCharts.exec('area-datetime', 'zoomX', start, end)
		}
	}

	return (
		<S.GraphBox id="chart">
			<div id="chart-timeline">
				<Filter filterArray={dateFilter} onClick={onFilter} />
				<ReactApexChart
					options={options}
					series={series}
					height={500}
					type="area"
					width={900}
					ref={chartRef}
				/>
			</div>
		</S.GraphBox>
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

const S = {
	GraphBox,
}
