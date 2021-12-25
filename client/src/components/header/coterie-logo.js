import React from 'react';

import { PeopleFill as PeopleIcon } from 'react-bootstrap-icons';

const CoterieLogo = () => (
	<span style={{ position: 'relative', top: '-0.125rem' }}>
		<PeopleIcon />
		<PeopleIcon style={{ transform: 'scaleX(-1)' }} />
	</span>
);

export default CoterieLogo;
