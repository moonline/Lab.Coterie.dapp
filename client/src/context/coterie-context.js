import React from 'react';

const CoterieContext = React.createContext({
	coteries: null,
	currentCoterie: null,
	setCurrentCoterie: () => {},
	createCoterie: () => {}
});

export default CoterieContext;
