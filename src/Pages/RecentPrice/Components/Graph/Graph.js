import React, { useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import Filter from '../../../../Components/Filter/Filter'
import { FlexCenterCSS } from '../../../../Styles/common'

function Graph({ dummyData, avgPrice, search }) {
	const chartRef = useRef(null)
	const [chartHeight, setChartHeight] = useState(500)
	const [chartWidth, setChartWidth] = useState(900)

	// Filter 종류
	const dateFilter = ['최근 3개월', '최근 6개월', '최근 1년']

	const defaultData = dummyData

	console.log(dummyData)

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
			name: search, // 상품명
			data: defaultData, // 데이터가 들어가야할 곳
		},
	]

	// Option
	const options = {
		chart: {
			defaultLocale: 'ko',
			locales: [
				{
					name: 'ko',
					options: {
						months: [
							'1월',
							'2월',
							'3월',
							'4월',
							'5월',
							'6월',
							'7월',
							'8월',
							'9월',
							'10월',
							'11월',
							'12월',
						],
						shortMonths: [
							'1월',
							'2월',
							'3월',
							'4월',
							'5월',
							'6월',
							'7월',
							'8월',
							'9월',
							'10월',
							'11월',
							'12월',
						],
					},
				},
			],
			id: 'areachart-2',
			type: 'area',
			height: chartHeight,
			width: chartWidth,
			zoom: {
				enabled: true,
				type: 'x',
				autoScaleYaxis: false,
				zoomedArea: {
					fill: {
						color: '#90CAF9',
						opacity: 0.4,
					},
					stroke: {
						color: '#0D47A1',
						opacity: 0.4,
						width: 1,
					},
				},
			},
			toolbar: {
				show: false,
				autoSelectd: 'zoom',
			},
		},
		annotations: {
			yaxis: avgPrice
				? [
						{
							y: Number(`${avgPrice}`),
							strokeDashArray: 5,
							borderColor: 'black',
							label: {
								borderColor: 'black',
								borderWidth: 16,
								borderRadius: 10,
								textAnchor: 'middle',
								offsetX: -70,
								offsetY: 9,
								style: {
									color: 'white',
								},
								text: `평균가격 ${avgPrice.toLocaleString()}원`,
							},
						},
				  ]
				: undefined,
		},
		dataLabels: {
			enabled: false,
		},
		markers: {
			size: 0,
			style: 'hollow',
		},
		title: {
			text: `${search} 시세 동향`,
			align: 'center',
			style: {
				fontSize: '30',
				color: '#666',
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0,
				opacityTo: 0,
				stops: [0, 0],
			},
		},
		theme: {
			mode: 'light',
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
					return (Math.round(val / 1000) * 1000).toLocaleString()
				},
			},
			title: {
				text: '가격',
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
			tickAmount: 100,
			labels: {
				datetimeFormatter: {
					year: 'yyyy년 MMM',
					month: 'MMM',
					day: 'MMM dd일',
				},
			},
		},
		tooltip: {
			shared: true,
			followCursor: true,
			intersect: false,
			style: {
				fontSize: '20px',
			},
			x: {
				// format: 'yy년 MM월 dd일 HH시 mm분 ss초',
				format: 'yy년 MM월 dd일',
			},
			y: {
				style: {
					fontSize: '50px',
				},
				formatter: function (val) {
					return val.toLocaleString() + '원'
				},
			},
		},
	}

	// ApexFilter zoom-in, zoom-out 적용
	function updateData(timeline) {
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

		// Zoom 조절
		if (start && end) {
			return ApexCharts.exec('areachart-2', 'zoomX', start, end)
		}
	}

	useEffect(() => {
		updateData('최근 3개월')
	}, [dummyData])

	return (
		<S.GraphBox id="chart">
			<div id="chart-timeline">
				<Filter filterArray={dateFilter} onClick={onFilter} />
				<ReactApexChart
					name="kor"
					options={options}
					series={series}
					height={chartHeight}
					type="area"
					width={chartWidth}
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
