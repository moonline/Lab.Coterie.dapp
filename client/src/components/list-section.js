import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';

import CoterieContext from '../context/coterie-context';

import CoterieList from './coterie-list';

const ListSection = () => {
	const { coteries } = useContext(CoterieContext);

	return coteries !== null ? <CoterieList /> : <Alert variant="primary">Loading...</Alert>;
};

export default ListSection;
