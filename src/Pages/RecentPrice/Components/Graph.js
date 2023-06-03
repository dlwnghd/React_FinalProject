import React, { useEffect, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import { FlexCenterCSS } from '../../../Styles/common'

function Graph({ quoteList, searchQuote }) {
	const chartRef = useRef(null)
	const chartContainerRef = useRef(null)

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
		quoteDataList = quoteList.cumulativeAvgPrice.map(item => {
			return {
				x: item.date,
				y: Number(item.avgPrice),
			}
		})
	}

	// 전체 데이터 변화 할때 마다
	useEffect(() => {
		// 평균값을 저장합니다.
		const nonZeroData = quoteDataList?.filter(item => item.y !== 0)
		const sum = nonZeroData?.reduce((acc, curr) => acc + curr.y, 0)
		const avg = sum / nonZeroData?.length
		setAvgPrice(avg)
	}, quoteDataList)

	// Series(데이터가 들어가야할 곳!)
	const series = [
		{
			name: searchQuote, // 검색명
			data: quoteDataList, // 데이터가 들어가야할 곳
		},
	]

	// 반응형 그래프 데이터 function화
	function createBreakpoint(breakpoint, width, height, offsetX) {
		return {
			breakpoint: breakpoint,
			options: {
				chart: {
					width: width,
					height: height,
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
										offsetX: offsetX,
										offsetY: 7,
										text: `최근 1년 평균거래 : ${Math.round(
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
			},
		}
	}

	// Option
	const options = {
		responsive: [
			createBreakpoint(414, 330, 200, -150),
			createBreakpoint(820, 660, 400, -450),
			createBreakpoint(10000, 900, 500, -700),
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
			id: 'quoteGraph',
			type: 'area',
			height: 500,
			width: 900,
			zoom: {
				enabled: false,
				type: 'x',
				autoScaleYaxis: true,
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
								offsetX: -700,
								offsetY: 7,
								text: `최근 1년 평균거래 : ${Math.round(
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
			size: 5,
			colors: undefined,
			strokeColors: '#fff',
			strokeWidth: 2,
			strokeOpacity: 0.9,
			strokeDashArray: 5,
			fillOpacity: 1,
			shape: 'circle',
			offsetX: 0,
			offsetY: 0,
			onClick: undefined,
			onDblClick: undefined,
			showNullDataPoints: true,
			hover: {
				size: 10,
			},
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
			range: 7 * 24 * 60 * 60 * 1000, // 확대 최소 범위 7일 ➡️ 첫번째 랜더링 될때 내가 원하는 범위로 zoom을 해줌 다만 그 기간의 범위가 고정되는 문제가 있음
			labels: {
				datetimeFormatter: {
					year: 'yyyy년 MMM',
					month: 'MMM',
					day: 'MMM dd일',
				},
			},
			enabled: false,
		},
		tooltip: {
			shared: true,
			followCursor: true,
			intersect: false,
			fillSeriesColor: true,
			style: {
				fontSize: '1.4rem',
			},
			x: {
				format: 'yyyy년 MM월 dd일',
			},
			y: {
				formatter: function (val) {
					return Math.round(val).toLocaleString() + '원'
				},
			},
		},
	}

	return (
		<S.GraphWrapper>
			<S.GraphContainer ref={chartContainerRef}>
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

	// Apexchart클래스명에 직접적으로 주기
	& .apexcharts-xaxistooltip {
		display: none;
	}

	& .apexcharts-tooltip-text-y-value,
	.apexcharts-tooltip-text-y-label {
		font-size: 2.5rem;
		font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	}
`

const GraphContainer = styled.div``

const S = {
	GraphWrapper,
	GraphContainer,
}
