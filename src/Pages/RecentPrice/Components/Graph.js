import React, { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import Filter from '../../../Components/Filter/Filter'
import { FlexCenterCSS } from '../../../Styles/common'

function Graph({ quoteList, searchQuote}) {
	const chartRef = useRef(null)
	const chartContainerRef = useRef(null)

	// Filter 종류
	const dateFilter = [
		'최근 일주일',
		'최근 1개월',
		'최근 3개월',
		'최근 6개월',
		'최근 1년',
	]

	const korMonth = [
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
	]

	let quoteDataList = []

	const [avgPrice, setAvgPrice] = useState(0)

	if (quoteList) {
		quoteDataList = quoteList.prod_idx.cumulativeAvgPrice.map(item => {
			return {
				x: item.date,
				y: Number(item.avgPrice),
			}
		})
	}

	// 전체 데이터 변화 할때 마다
	useEffect(() => {
		// 평균값을 저장합니다.
		const nonZeroData = quoteDataList.filter(item => item.y !== 0)
		const sum = nonZeroData.reduce((acc, curr) => acc + curr.y, 0)
		const avg = sum / nonZeroData.length
		setAvgPrice(avg)

		// updateData('최근 일주일')
	}, quoteDataList)

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
			name: searchQuote, // 검색명
			data: quoteDataList, // 데이터가 들어가야할 곳
		},
	]

	// Option
	const options = {
		responsive: [
			{
				breakpoint: 414, // 414px 이하
				options: {
					chart: {
						width: 330,
						height: 200,
					},
				},
			},
			{
				breakpoint: 820, // 820px 이하
				options: {
					chart: {
						width: 660,
						height: 400,
					},
				},
			},
			{
				breakpoint: 10000, // 10000px 이하
				options: {
					chart: {
						width: 900,
						height: 500,
					},
				},
			},
		],
		chart: {
			redrawOnWindowResize: true,
			redrawOnParentResize: false,
			defaultLocale: 'ko',
			locales: [
				{
					name: 'ko',
					options: {
						months: korMonth,
						shortMonths: korMonth,
					},
				},
			],
			id: 'areachart-2',
			type: 'area',
			height: 500,
			width: 900,
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
							y: Number(`${Math.round(avgPrice)}`),
							strokeDashArray: 2,
							borderColor: 'black',
							label: {
								borderColor: 'black',
								borderWidth: 1,
								borderRadius: 10,
								textAnchor: 'middle',
								offsetX: -70,
								offsetY: 7,
								text: `기간 내 평균거래 : ${Math.round(
									avgPrice,
								).toLocaleString()}원`,
								style: {
									color: 'white',
									background: 'black',
									fontWeight: 700,
									padding: {
										left: 6,
										right: 6,
										top: 3,
										bottom: 5,
									},
								},
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
			text: `${searchQuote ? searchQuote : '전체 상품'} 시세 동향`,
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
				format: 'yy년 MM월 dd일',
			},
			y: {
				style: {
					fontSize: '50px',
				},
				formatter: function (val) {
					return Math.round(val).toLocaleString() + '원'
				},
			},
		},
	}

	// ApexFilter zoom-in, zoom-out 적용
	function updateData(timeline) {
		const today = new Date() // 오늘 날짜

		// Filter되는 날짜 데이터 연산 후 저장
		// 기준일로부터 일정 개월 전의 날짜 계산
		const getDateMinusMonths = (date, months) => {
			const newDate = new Date(date)
			newDate.setMonth(date.getMonth() - months)
			return newDate.getTime()
		}

		const dateFilter = {
			'최근 일주일': [
				new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate() - 6,
				).getTime(),
				today.getTime(),
			],
			'최근 1개월': [getDateMinusMonths(today, 1), today.getTime()],
			'최근 3개월': [getDateMinusMonths(today, 3), today.getTime()],
			'최근 6개월': [getDateMinusMonths(today, 6), today.getTime()],
			'최근 1년': [getDateMinusMonths(today, 12), today.getTime()],
		}

		// ex)  2/8 ~ 5/8 (3개월 전)
		const [start, end] = dateFilter[timeline] || []

		// Zoom 조절
		if (start && end) {
			return ApexCharts.exec('areachart-2', 'zoomX', start, end)
		}
	}

	return (
		<S.GraphWrapper>
			<S.GraphContainer ref={chartContainerRef}>
				<Filter filterArray={dateFilter} onClick={onFilter} />
				<ReactApexChart
					name="kor"
					options={options}
					series={series}
					type="area"
					height={500}
					width={900}
					ref={chartRef}
				/>
			</S.GraphContainer>
		</S.GraphWrapper>
	)
}

export default Graph

const GraphWrapper = styled.div`
	${FlexCenterCSS}

	@media screen and(max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		& > div {
			width: 350px;
		}
	}
`

const GraphContainer = styled.div``

const S = {
	GraphWrapper,
	GraphContainer,
}
