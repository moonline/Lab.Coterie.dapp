import React, { useContext } from 'react';

import { ChatDots as ChatDotsIcon } from 'react-bootstrap-icons';

import CoterieContext from '../../context/coterie-context';

import CenterPanel from '../common/center-panel';

import NewCoterieForm from './new-coterie-form';
import CoterieDetail from './coterie-detail';

const DetailSection = () => {
	const { currentCoterie } = useContext(CoterieContext);

	if (currentCoterie !== null) {
		return currentCoterie.id === 'NEW' ? <NewCoterieForm /> : <CoterieDetail />;
	} else {
		return (
			<CenterPanel>
				<p className="text-center">
					<ChatDotsIcon />
					<br />
					Select a coterie or create a new one.
				</p>
			</CenterPanel>
		);
	}
};

export default DetailSection;
