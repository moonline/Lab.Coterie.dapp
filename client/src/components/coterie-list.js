import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import { PlusCircleFill as PlusCircleIcon } from 'react-bootstrap-icons';

import CoterieContext from '../context/coterie-context';

const CoterieList = () => {
	const { coteries, addCoterie, setCurrentCoterie } = useContext(CoterieContext);

	return (
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
	);
};

export default CoterieList;
