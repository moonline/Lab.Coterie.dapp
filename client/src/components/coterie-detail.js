import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CloudArrowUpFill as CloudArrowUpIcon } from 'react-bootstrap-icons';

import CoterieContext from '../context/coterie-context';

const CoterieDetail = () => {
	const { currentCoterie, setCurrentCoterie, createCoterie, estimatedGas } = useContext(CoterieContext);

    if (currentCoterie !== null) {
        return currentCoterie.id === 'NEW' ? (
		    <>
			    <h2>Coterie</h2>
                <Form>
                  <Form.Group className="mb-3" controlId="coterieName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter coterie name" value={currentCoterie.name} onChange={(event) => setCurrentCoterie({ ...currentCoterie, name: event.target.value })} />
                    <Form.Text className="text-muted">
                      A meaningful name for the new Coterie
                    </Form.Text>
                  </Form.Group>
                 <Form.Group className="mb-3" controlId="gasCost">
                    <Form.Label>Estimated gas cost</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={estimatedGas.createCoterie} />
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={createCoterie} disabled={currentCoterie.name.length < 3}>
                    <CloudArrowUpIcon /> Create coterie
                  </Button>
                </Form>
		    </>
        ) : (
		    <>
                <h2>Coterie ({ currentCoterie.id })</h2>
		    </>
        );
    } else {
        return <Alert variant="primary">Select a coterie or create a new one.</Alert>;
    }
};

export default CoterieDetail;
