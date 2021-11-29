import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { PlusCircleFill as PlusCircleIcon } from 'react-bootstrap-icons';

import CoterieContext from '../context/coterie-context';

const CoterieList = () => {
	const { coteries, addCoterie, setCurrentCoterie } = useContext(CoterieContext);

	return coteries !== null ? (
		<>
			<h2>Coteries ({coteries.length})</h2>
			<Button variant="primary" type="button" onClick={addCoterie}>
				<PlusCircleIcon /> Create coterie
			</Button>
			<ul>
				{coteries.map(coterie => (
					<li key={coterie.id} onClick={() => setCurrentCoterie(coterie)}>
						{coterie.id.slice(-10)}
					</li>
				))}
			</ul>
		</>
	) : (
		<Alert variant="primary">Loading...</Alert>
	);
};

export default CoterieList;
