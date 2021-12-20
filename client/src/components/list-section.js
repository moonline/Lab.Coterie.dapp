import React, { useContext } from 'react';

import CoterieContext from '../context/coterie-context';

import CoterieList from './coterie-list';
import LoadingPanel from './loading-panel';

const ListSection = () => {
	const { coteries } = useContext(CoterieContext);

	return coteries !== null ? <CoterieList /> : <LoadingPanel />;
};

export default ListSection;
