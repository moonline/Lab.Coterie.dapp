import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CloudArrowUpFill as CloudArrowUpIcon } from 'react-bootstrap-icons';

const NewCoterieForm = ({ setCurrentCoterie, createCoterie, currentCoterie, estimatedGas }) => (
	<>
		<h2>New Coterie</h2>
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
			<Form.Group className="mb-3" controlId="gasCost">
				<Form.Label>Estimated gas cost</Form.Label>
				<Form.Control plaintext readOnly defaultValue={estimatedGas.createCoterie} />
			</Form.Group>
			<Button
				variant="primary"
				type="button"
				onClick={createCoterie}
				disabled={currentCoterie.name.length < 3}
			>
				<CloudArrowUpIcon /> Create coterie
			</Button>
		</Form>
	</>
);

export default NewCoterieForm;
