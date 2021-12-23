import React, { useContext } from 'react';

import CoterieContext from '../../context/coterie-context';

import LoadingPanel from '../common/loading-panel';

import CoterieList from './coterie-list';

const ListSection = () => {
	const { coteries } = useContext(CoterieContext);

	return coteries !== null ? <CoterieList /> : <LoadingPanel />;
};

export default ListSection;
