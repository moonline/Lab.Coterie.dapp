import React from 'react';

import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ percent, ...props }) => (
	<Doughnut
		data={{
			datasets: [
				{
					data: [percent, 1 - percent],
					backgroundColor: ['darkslategray', 'lightgray']
				}
			]
		}}
		{...props}
	/>
);

export default DoughnutChart;
