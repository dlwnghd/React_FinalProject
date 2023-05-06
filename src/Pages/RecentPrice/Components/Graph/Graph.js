import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import { FlexCenterCSS } from '../../../../Styles/common'

function Graph({ filterOption }) {
	console.log(filterOption)

	const date = new Date()
	const nowMonth = date.getMonth() + 1

	console.log(nowMonth)

	const series = [
		{
			name: 'series-1',
			data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 90, 80],
		},
	]
	const options = {
		theme: {
			mode: 'dark',
		},
		chart: {
			type: 'area',
			stacked: false,
			height: 350,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true,
			},
		},
		xaxis: {
			categories: [
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
	}

	return (
		<GraphBox>
			<ReactApexChart
				type="line"
				series={series}
				options={options}
				height={500}
				width={600}
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
