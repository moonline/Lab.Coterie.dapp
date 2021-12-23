import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { PlusCircleFill as PlusCircleIcon } from 'react-bootstrap-icons';

import CoterieContext from '../context/coterie-context';
import CenterPanel from './center-panel';
import SectionHeader from './section-header';

const CoterieList = () => {
	const { coteries, addCoterie, currentCoterie, setCurrentCoterie } = useContext(CoterieContext);

	return coteries.length > 0 ? (
		<>
			<SectionHeader
				actions={
					<Button
						variant="success"
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
			<ListGroup variant="flush">
				{coteries.map(coterie => (
					<ListGroup.Item
						className={
							currentCoterie && coterie.id === currentCoterie.id
								? 'bg-success text-white'
								: 'bg-transparent text-white'
						}
						key={coterie.id}
						action
						onClick={() => setCurrentCoterie(coterie)}
					>
						{coterie.id.slice(-10)}
					</ListGroup.Item>
				))}
			</ListGroup>
		</>
	) : (
		<CenterPanel>
			<Button variant="success" type="button" onClick={addCoterie}>
				<PlusCircleIcon /> Create Coterie
			</Button>
		</CenterPanel>
	);
};

export default CoterieList;
