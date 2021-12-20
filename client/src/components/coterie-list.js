import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import { PlusCircleFill as PlusCircleIcon } from 'react-bootstrap-icons';

import CoterieContext from '../context/coterie-context';
import CenterPanel from './center-panel';
import SectionHeader from './section-header';

const CoterieList = () => {
	const { coteries, addCoterie, setCurrentCoterie } = useContext(CoterieContext);

	return coteries.length > 0 ? (
		<>
			<SectionHeader
				actions={
					<Button
						variant="primary"
						type="button"
						title="Create coterie"
						size="sm"
						onClick={addCoterie}
					>
						<PlusCircleIcon />
					</Button>
				}
			>
				Coteries ({coteries.length})
			</SectionHeader>
			<ul>
				{coteries.map(coterie => (
					<li key={coterie.id} onClick={() => setCurrentCoterie(coterie)}>
						{coterie.id.slice(-10)}
					</li>
				))}
			</ul>
		</>
	) : (
		<CenterPanel>
			<Button variant="primary" type="button" onClick={addCoterie}>
				<PlusCircleIcon /> Create Coterie
			</Button>
		</CenterPanel>
	);
};

export default CoterieList;
