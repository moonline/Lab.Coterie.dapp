import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';

import CoterieContext from '../context/coterie-context';

const CoterieList = () => {
	const { coteries } = useContext(CoterieContext);

	return coteries !== null ? (
		<>
			<h2>Coteries ({coteries.length})</h2>
		</>
	) : (
		<Alert variant="primary">Loading...</Alert>
	);
};

export default CoterieList;
