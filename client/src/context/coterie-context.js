import React from 'react';

const CoterieContext = React.createContext({
	coteries: null,
	currentCoterie: null,
	setCurrentCoterie: () => {},
	createCoterie: () => {},
	addCoterie: () => {}
});

export default CoterieContext;
