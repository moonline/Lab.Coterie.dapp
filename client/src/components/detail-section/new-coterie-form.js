import React, { useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CloudArrowUpFill as CloudArrowUpIcon } from 'react-bootstrap-icons';

import CoterieContext from '../../context/coterie-context';

import SectionHeader from '../common/section-header';
import FormattedNumber from '../common/formatted-number';

const NewCoterieForm = () => {
	const { currentCoterie, setCurrentCoterie, createCoterie, estimatedGas } =
		useContext(CoterieContext);
	return (
		<>
			<SectionHeader>New Coterie</SectionHeader>
			<Form>
				<Form.Group className="mb-3" controlId="coterieName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter coterie name"
						value={currentCoterie.name}
						onChange={event => setCurrentCoterie({ ...currentCoterie, name: event.target.value })}
					/>
					<Form.Text className="text-muted">A meaningful name for the new Coterie</Form.Text>
				</Form.Group>

				<Button
					variant="success"
					type="button"
					onClick={createCoterie}
					disabled={currentCoterie.name.length < 3}
				>
					<CloudArrowUpIcon /> Create coterie (~
					<FormattedNumber format="0.0a">{estimatedGas.createCoterie}</FormattedNumber> gas)
				</Button>
			</Form>
		</>
	);
};

export default NewCoterieForm;
