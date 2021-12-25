import React from 'react';

import { HourglassSplit as HourglassIcon } from 'react-bootstrap-icons';

import CenterPanel from './center-panel';

const LoadingPanel = () => (
	<CenterPanel>
		<p className="text-center">
			<HourglassIcon />
			<br />
			Loading...
		</p>
	</CenterPanel>
);

export default LoadingPanel;
