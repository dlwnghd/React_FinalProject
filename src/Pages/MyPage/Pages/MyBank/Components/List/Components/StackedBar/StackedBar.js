import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'
import LoadingSkeleton from '../../../../../../../../Components/Skeleton/Skeleton'

function StackedBar({ status, sale, purchase }) {
	const config = {
		series: [
			{
				name: '판매',
				data: [sale],
			},
			{
				name: '구매',
				data: [purchase],
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 100,
				stacked: true,
			},
			plotOptions: {
				bar: {
					horizontal: true,
					dataLabels: {
						total: {
							enabled: true,
							offsetX: 0,
							style: {
								fontSize: '1.1rem',
								fontWeight: 900,
							},
						},
					},
				},
			},
			colors: ['rgba(49, 104, 204, 0.7)', 'rgba(255, 124, 106, 0.7)'],
			stroke: {
				width: 1,
				colors: ['#fff'],
			},
			title: {
				text: '선택한 달의 내역',
			},
			xaxis: {
				title: {
					text: '총 소비+지출',
				},
				categories: [''],
				labels: {
					formatter: function (val) {
						return val + '원'
					},
				},
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + '원'
					},
				},
			},
			fill: {
				opacity: 1,
			},
			legend: {
				position: 'top',
				horizontalAlign: 'left',
				offsetX: 40,
			},
		},
	}

	if (status === 'loading') {
		return (
			<S.Wrapper>
				<LoadingSkeleton
					width={'98%'}
					height={'100%'}
					style={{ margin: '0 auto' }}
				/>
			</S.Wrapper>
		)
	}

	if (status === 'error') return

	return (
		<S.Wrapper>
			<div id="chart">
				<ReactApexChart
					options={config.options}
					series={config.series}
					type="bar"
					height={200}
				/>
			</div>
		</S.Wrapper>
	)
}
export default StackedBar

const Wrapper = styled.div`
	height: 24rem;
	box-shadow: 0 4px 14px rgba(48, 52, 65, 0.12);
	border-radius: 0.8rem;
	padding: 3rem 0;
	margin: 2rem 0 6rem;
`
const S = { Wrapper }
