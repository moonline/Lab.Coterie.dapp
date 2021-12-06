import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';

import CoterieContext from '../context/coterie-context';

import NewCoterieForm from './new-coterie-form';
import CoterieDetail from './coterie-detail';

const DetailSection = () => {
	const { currentCoterie } = useContext(CoterieContext);

	if (currentCoterie !== null) {
		return currentCoterie.id === 'NEW' ? <NewCoterieForm /> : <CoterieDetail />;
	} else {
		return <Alert variant="primary">Select a coterie or create a new one.</Alert>;
	}
};

export default DetailSection;
